import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class SteganographyService {
  // храним ссылку на элемент холста
  private canvas: HTMLCanvasElement
  // храним ссылку на контекст холста
  private ctx: CanvasRenderingContext2D
  
  // метод инициализации, запускается один раз.
  // получает элемент холста, создает его контекст и записывает их в переменные
  // холст используется как промежуточный объект для преобразования изображений,
  // он скрыт от пользователя, но его использование необходимо
  // из за особенностей работы браузера и соответствующих ограничений
  // на работу с файлами
  public init(canvas: HTMLCanvasElement): void {
    this.ctx = canvas.getContext('2d')
    this.canvas = canvas
  }
  
  // метод вызывается каждый раз при загрузке файла картинки,
  // которую нужно зашифровать.
  // возвращает зашифрованное изображение в виде строки Base64,
  // получает файл картинки и строку которую нужно зашифровать
  public async encrypt(img: File, message: string): Promise<string> {
    // получаем двоичный массив из строки
    const messageUint8Array: Uint8Array = this.getMessageUint8Array(message)
    // получаем объект ImageData (включает двоичный массив изображение и его размеры)
    // из файла картинки
    const imageData: ImageData = await this.getImgData(img)
    // встраиваем текст в картинку
    const encryptedImageData: ImageData = this.writeBytes(messageUint8Array, imageData)
    // вставляем полученное изображение в холст
    this.ctx.putImageData(encryptedImageData, 0, 0)
    // получаем строку Base64 и возвращаем ее
    return this.canvas.toDataURL()
  }
  
  // метод вызывается каждый раз при загрузке файла картинки,
  // которую нужно расшифровать.
  // возвращает строку с расшифрованной фразой,
  // получает файл картинки
  public async decrypt(img: File): Promise<string> {
    // получаем объект ImageData (включает двоичный массив изображения и его размеры)
    // из файла картинки
    const imageData: ImageData = await this.getImgData(img)
    // извлекаем фразу из картинки в формате бинарного массива
    const textData: Uint8Array = this.readBytes(imageData)
    // создаем экземпляр встроенного объекта TextDecoder и задаем формат utf8
    const decoder = new TextDecoder('utf8')
    // преобразуем бинарный массив в строку и возвращаем ее
    return decoder.decode(textData)
  }
  
  // метод преобразует строку в бинарный массив
  private getMessageUint8Array(message: string): Uint8Array {
    // создаем экземпляр встроенного объекта TextEncoder
    const encoder = new TextEncoder()
    // преобразуем строку в бинарный массив и возвращаем его
    return encoder.encode(message)
  }
  
  // метод преобразует файл картинки в объект ImageData
  // (включает двоичный массив изображения и его размеры)
  private getImgData(fileImg: File): Promise<ImageData> {
    // возвращаем встроенный объект Promise и возвращаем его
    // вернет значение после завершения асинхронных операций
    // обработки файла
    return new Promise<ImageData>(done => {
      // создаем встроенный объект FileReader для чтения файла
      const fr = new FileReader()
      // задаем тип для объекта события 'load'
      type EventReader = Event & {target: {result: string}}
      // задаем обработчик события 'load' (срабатывает после завершения чтения файла,
      // возвращает изображение в виде строки в формате Base64)
      fr.addEventListener('load', (e: EventReader) => {
        // создаем HTML элемент IMG
        const img = new Image()
        // задаем обработчик события 'load' на элементе IMG
        img.onload = () => {
          // получаем ширину и высоту изображения
          const {width, height} = img
          // задаем ширину и высоту холсту
          this.canvas.width = width
          this.canvas.height = height
          // вставляем изображение в холст
          this.ctx.drawImage(img, 0, 0)
          // получаем объект ImageData из контекста холста
          const imageData: ImageData = this.ctx.getImageData(0, 0, width, height)
          // вызываем разрешение Promise и передаем полученный результат
          done(imageData)
        }
        // передаем строку с изображением в источник элемента IMG
        img.src = e.target.result
      })
      // запускаем чтение строки изображения из файла изображения
      fr.readAsDataURL(fileImg)
    })
  }
  
  // метод заполняет биты данных в изображении битами текстовой фразы
  // принимает бинарный массив с текстом и объект ImageData с исходным изображением
  // возвращает объект ImageData с измененным изображением
  private writeBytes(messageUint8Array: Uint8Array, imageData: ImageData): ImageData {
    let index: number = 0
    // в целях сохранения иммутабельности создаем копию бинарного массива изображения
    const copiedImageData = Uint8ClampedArray.from(imageData.data)
    // сохраняем длину бинарного массива фразы
    const messageLength = messageUint8Array.length
    
    // идем циклом по бинарному массиву фразы
    for(let i = 0; i < messageLength; i++) {
      // храним секретные данные на первом бите,
      // который должен умножаться на 4, так как код одного символа содержит 8 бит
      // эти 8 бит делятся на 2.
      // каждые 2 бита должны заменить младший бит байта пикселя
      if(i == 0) {
        const secretLength = messageLength * 4
        // массив может хранить только значение не более 256 (8 бит или 1 байт)
        if(secretLength > 255) {
          const division = secretLength / 255
          // для целого значения
          if(division % 1 === 0) {
            for(let k = 0; k < division; k++) {
              copiedImageData[k] = 255
              index++
            }
            // для дробного значения
          } else {
            const firstPortion = +division.toString().split('.')[0]
            
            let indexK = 0
            for(let k = 0; k < firstPortion; k++) {
              copiedImageData[k] = 255
              index++
              indexK = k
            }
            
            copiedImageData[indexK] = Math.round((division - firstPortion) * 255)
            index++
          }
          
        } else {
          copiedImageData[0] = secretLength
          index++
        }
      }
      
      // получаем ascii код символа
      const asciiCode = messageUint8Array[i]
      // используем маску, чтобы очистить бит, и взять только нужный бит
      // берем первые 2 бита, например: 0111 0011 => 0000 0011
      const first2bit = (asciiCode & 0x03)
      // берем первые 4 бита, например: 0111 0011 => 0000 0000
      const first4bitMiddle = (asciiCode & 0x0C) >> 2
      // берем первые 6 бит, например: 0111 0011 => 0011 0000
      const first6bitMiddle = (asciiCode & 0x30) >> 4
      // берем первые 8 бит, например: 0111 0011 => 0100 0000
      const first8bitMiddle = (asciiCode & 0xC0) >> 6
      
      replaceByte(first2bit)
      replaceByte(first4bitMiddle)
      replaceByte(first6bitMiddle)
      replaceByte(first8bitMiddle)
      
      function replaceByte(bits: number) {
        // очищаем первые два бита и заменяем битами фразы
        copiedImageData[index] = (copiedImageData[index] & 0xFC) | bits
        index++
      }
    }
    
    //создаем объект ImageData с измененными данными и возвращаем его
    return new ImageData(copiedImageData, imageData.width, imageData.height)
  }
  
  // метод извлекает бинарный массив из объекта ImageData картинки
  private readBytes(imageData: ImageData): Uint8Array {
    let totalLength: number = 0
    let lastIndex: number
    
    // идем циклом по массиву изображения
    for(let i = 0; i < imageData.data.length; i++) {
      // получаем длину для сопоставленного индекса
      if(imageData.data[i] == 255) {
        totalLength += imageData.data[i]
        if(imageData.data[i + 1] < 255) {
          totalLength += imageData.data[i + 1]
          lastIndex = i + 1
          break
        }
      } else {
        totalLength += imageData.data[i]
        lastIndex = i
        break
      }
    }
    // создаем экземпляр массива длинной разделенной на 4
    const newUint8Array = new Uint8Array(totalLength / 4)
    let j = 0
    // извлекаем биты из пикселя
    for(let i = (lastIndex + 1); i < totalLength; i = i + 4) {
      // извлекаем первые 2 бита от байта т.к. содержат бит данных фразы
      // сдвигаем влево для каждого бита
      const aShift = (imageData.data[i] & 3)
      const bShift = (imageData.data[i + 1] & 3) << 2
      const cShift = (imageData.data[i + 2] & 3) << 4
      const dShift = (imageData.data[i + 3] & 3) << 6
      
      // объединяем сдвинутые биты, чтобы сформировать байт
      newUint8Array[j] = (((aShift | bShift) | cShift) | dShift)
      j++
    }
    // возвращаем массив
    return newUint8Array
  }
}
