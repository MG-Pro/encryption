import {Injectable} from '@angular/core'

@Injectable()
export class CesarCodeService {
  // главный метод для шифрования, принимает строку и ключ
  encrypt(inputString: string, key: number): string {
    return this.crypt(inputString, key, 1)
  }

  // главный метод для дешифрования, принимает строку и ключ
  decrypt(inputString: string, key: number): string {
    return this.crypt(inputString, key, -1)
  }

  // универсальный метод шифрования/дешифрования, принимает строку, ключ и направления хода по алфавиту
  crypt(inputString: string, key: number, direction: number): string {
    // получаем массив символов из строки
    const inputArray: string[] = inputString.split('')
    // получаем алфавит
    const abc: string[] = this.createAbc(inputArray)
    // если значение ключа больше длинны алфавита, преобразуем ключ
    if (key >= abc.length) {
      key = key % abc.length + 1
    }

    // проходим по массиву символов и добавляем в накопитель (строка) символ после сдвига
    return inputArray.reduce((acc, sym) => {
      // находим индекс текущего символа в алфавите
      const index = abc.findIndex(abcSym => abcSym === sym)
      // получаем значение сдвига с учетом направления
      const shiftIndex = index + key * direction
      // проверяем существует ли символ в алфавите с применением сдвига
      // если да получаем его
      // иначе вычисляем индекс с учетом направления
      const encryptedSymbolIndex = !abc[shiftIndex]
        ? shiftIndex - abc.length * direction
        : shiftIndex
      // добавляем найденный символ в накопитель
      acc += abc[encryptedSymbolIndex]
      // передаем накопитель на след. итерацию
      return acc
    }, '')
  }
  // создает алфавит из фразы, массив уникальных символов
  createAbc(inputArray: string[]): string[] {
    return inputArray.reduce((acc: string[], sym: string) => {
      // проверяет, есть ли текущий символ в накопители и если нет добавляет его туда
      !acc.includes(sym) && acc.push(sym)
      // передает накопитель на след. итерацию
      return acc
    }, [])
  }
}
