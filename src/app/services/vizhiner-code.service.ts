import {Injectable} from '@angular/core'

@Injectable()
export class VizhinerCodeService {
  // задаем Русский алфавит и получаем из него массив символов
  ru: string[] = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('')

  encrypt(inputString: string, key: string): string {
    // преобразуем входящий текст и ключ в верхний регистр
    // и убираем пробелы по краям
    inputString = inputString.toUpperCase().trim()
    key = key.toUpperCase().trim()

    // генерируем квадрат Виженера
    const abcTable = this.createAbcTable(this.ru)

    // задаем переменную накопитель
    let encryptMessage = ''
    // дублируем ключ до длины сообщения
    const newKey = this.repeatString(key, inputString)

    // проходим циклом по строке
    for (let it = 0; it < inputString.length; it++) {
      // проверяем наличие символа в алфавите, если нет - оставляем как есть
      if (!this.ru.includes(inputString[it])) {
        encryptMessage += inputString[it]
        continue
      }

      // находим индекс строки равный символу исходной строки
      let i: number = this.ru.indexOf(inputString[it])
      // находим индекс колонки равный символу ключа
      let j: number = this.ru.indexOf(newKey[it])
      // записываем зашифрованный символ, равный пересечению индекса строки и колонки в накопитель
      encryptMessage += abcTable[i][j]
    }
    // возвращаем накопитель с зашифрованным текстом
    return encryptMessage
  }

  decrypt(inputString: string, key: string): string {
    // преобразуем входящий текст и ключ в верхний регистр
    // и убираем пробелы по краям
    inputString = inputString.toUpperCase().trim()
    key = key.toUpperCase().trim()

    // генерируем квадрат Виженера
    const abcTable = this.createAbcTable(this.ru)

    // задаем переменную накопитель
    let decryptMessage = ''
    // дублируем ключ до длины сообщения
    let newKey = this.repeatString(key, inputString)

    // проходим циклом по строке
    for (let it = 0; it < inputString.length; it++) {
      // проверяем наличие символа в алфавите, если нет - оставляем как есть
      if (!this.ru.includes(inputString[it])) {
        decryptMessage += inputString[it]
        continue
      }

      // находим индекс строки равный символу ключа
      let i = this.ru.indexOf(newKey[it])
      // находим индекс колонки равный символу исходной строки
      let j = abcTable[i].indexOf(inputString[it])

      // записываем символ по найденному ключу из алфавита в накопитель
      decryptMessage += this.ru[j]
    }
    // возвращаем накопитель с расшифрованным текстом
    return decryptMessage
  }

  repeatString(key: string, string: string): string {
    // задаем начальное значение счетчика индекса
    let counter = 0

    // разбиваем входную строку на символы и проходим по ним циклом
    return string
      .split('')
      .reduce((acc, symbol, i) => {
        // если индекс символа совпадает с длинной ключа
        // обнуляем счетчик
        if (i % key.length === 0) {
          counter = 0
        }

        // записываем в накопитель символ из ключа в соотв.
        // со значением счетчика
        acc += key[counter]
        // увеличиваем значение счетчика
        counter++
        // передаем накопитель на след. итерацию
        return acc
      }, '')
  }

  createAbcTable(abc: string[]): string[] {
    // проходим циклом по алфавиту и возвращаем результат
    return abc.reduce((acc, item, i) => {

      acc[i] = abc
        // получаем новый массив с элементами алфавита начиная с индекса i
        .slice(i)
        // соединяем предыдущий массив с массивом из элементов алфавита с индексами от 0 до i
        .concat(abc.slice(0, i))
      // передаем накопитель c массивом на след. итерацию
      return acc
    }, [])
  }
}
