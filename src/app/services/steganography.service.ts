import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class SteganographyService {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  public init(canvas: HTMLCanvasElement): void {
    this.ctx = canvas.getContext('2d')
    this.canvas = canvas
  }

  public async encrypt(img: File, message: string): Promise<string> {
    const messageUint8Array = this.getMessageUint8Array(message)
    const imageData = await this.getImgData(img)
    const imgData = this.writeBytes(messageUint8Array, imageData)
    this.ctx.putImageData(imgData, 0, 0)
    return this.canvas.toDataURL()
  }

  public async decrypt(img: File): Promise<string> {
    const imageView = await this.getImgData(img)
    const textData = this.readBytes(imageView)
    const decoder = new TextDecoder('utf8')
    return decoder.decode(textData)
  }

  private getMessageUint8Array(message: string): Uint8Array {
    const encoder = new TextEncoder()
    return encoder.encode(message)
  }

  private getImgData(fileImg: File): Promise<ImageData> {
    return new Promise<any>(done => {
      const fr = new FileReader()
      type EventReader = Event & { target: { result: string } }
      fr.addEventListener('load', (e: EventReader) => {
        const img = new Image()
        img.src = e.target.result
        img.onload = () => {
          const {width, height} = img
          this.canvas.width = width
          this.canvas.height = height
          this.ctx.clearRect(0, 0, width, height);
          this.ctx.drawImage(img, 0, 0)
          const imageData = this.ctx.getImageData(0, 0, width, height)
          done(imageData)
        }
      })
      fr.readAsDataURL(fileImg)
    })
  }

  private writeBytes(messageUint8Array: Uint8Array, imageData: ImageData): ImageData {
    let index = 0
    const copiedImageData = Uint8ClampedArray.from(imageData.data)
    const length = messageUint8Array.length

    for (let i = 0; i < length; i++) {
      if (i == 0) {
        const secretLength = length * 4

        if (secretLength > 255) {
          const division = secretLength / 255
          if (division % 1 === 0) {
            for (let k = 0; k < division; k++) {
              copiedImageData[k] = 255
              index++
            }
          } else {
            const firstPortion = +division.toString().split('.')[0]

            let indexK = 0
            for (let k = 0; k < firstPortion; k++) {
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

      const asciiCode = messageUint8Array[i]
      const first2bit = (asciiCode & 0x03)
      const first4bitMiddle = (asciiCode & 0x0C) >> 2
      const first6bitMiddle = (asciiCode & 0x30) >> 4
      const first8bitMiddle = (asciiCode & 0xC0) >> 6

      replaceByte(first2bit)
      replaceByte(first4bitMiddle)
      replaceByte(first6bitMiddle)
      replaceByte(first8bitMiddle)

      function replaceByte(bits: number) {
        copiedImageData[index] = (copiedImageData[index] & 0xFC) | bits
        index++
      }
    }

    return new ImageData(copiedImageData, imageData.width, imageData.height)
  }

  private readBytes(imageData: ImageData): Uint8Array {
    let totalLength = 0
    let lastIndex

    for(let i = 0; i < imageData.data.length; i++) {
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

    const newUint8Array = new Uint8Array(totalLength / 4)
    let j = 0

    for(let i = (lastIndex + 1); i < totalLength; i = i + 4) {
      const aShift = (imageData.data[i] & 3)
      const bShift = (imageData.data[i + 1] & 3) << 2
      const cShift = (imageData.data[i + 2] & 3) << 4
      const dShift = (imageData.data[i + 3] & 3) << 6

      newUint8Array[j] = (((aShift | bShift) | cShift) | dShift)
      j++
    }

    return newUint8Array
  }
}
