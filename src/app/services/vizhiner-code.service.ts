import {Injectable} from '@angular/core'

@Injectable()
export class VizhinerCodeService {

  ru: string[] = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('')

  encrypt(inputString: string, key: string): string {
    inputString = inputString.toUpperCase().trim()
    key = key.toUpperCase().trim()

    // Генерируем квадрат Виженера
    const abcTable = this.createAbcTable()
    let encryptMessage = ''
    // Дублируем ключ до длины сообщения
    const newKey = this.repeatString(key, inputString)

    for (let it = 0; it < inputString.length; it++) {
      if(!this.ru.includes(inputString[it])) {
        encryptMessage += inputString[it]
        continue
      }

      // Индекс строки раный символу сообщения
      let i: number = this.ru.indexOf(inputString[it])
      // Индекс колонки раный символу ключа
      let j: number = this.ru.indexOf(newKey[it])
      // Зашифрованный символ равный пересечению индекса строки и колонки
      encryptMessage += abcTable[i][j]
    }

    return encryptMessage
  }

  decrypt(inputString: string, key: string): string {
    inputString = inputString.toUpperCase().trim()
    key = key.toUpperCase().trim()

    let decryptMessage = "";
    let newKey = this.repeatString(key, inputString);
    const abcTable = this.createAbcTable()

    for (let it = 0; it < inputString.length; it++) {
      if(!this.ru.includes(inputString[it])) {
        decryptMessage += inputString[it]
        continue
      }

      // Берем символ ключа и ищем индекс строки с данным символом
      let i = this.ru.indexOf(newKey[it]);
      let j = abcTable[i].indexOf(inputString[it]);
      decryptMessage += this.ru[j];
    }
    return decryptMessage;
  }

  repeatString(key, string) {
    if(!key.length) {
      return key
    }
    let resultString = ''

    let it = 0
    for (let i = 0; i < string.length; i++) {
      if (i % key.length === 0) {
        it = 0
      }
      resultString += key[it]
      it++
    }
    return resultString
  }

  createAbcTable(): string[] {
    const acc = []
    const abc = this.ru
    for (let i = 0; i < abc.length; i++) {
      acc[i] = abc
        .slice(i)
        .concat(abc.slice(0, i))
    }

    return acc
  }
}
