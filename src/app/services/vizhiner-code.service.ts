import {Injectable} from '@angular/core'

@Injectable()
export class VizhinerCodeService {

  ru: string[] = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('')

  encrypt(inputString: string, key: string): string {
    return this.crypt(inputString.toUpperCase(), key.toUpperCase(), 1)
  }

  decrypt(inputString: string, key: string): string {
    return this.crypt(inputString, key, -1)
  }

  crypt(inputString: string, key: string, direction: number): string {
    const abcTable = this.createAbcTable();
    let s = "";
    for (let i = 0; i < inputString.length; i++) {
      const inputPosIndex = this.ru.indexOf(inputString[i])
      const keyPosIndex = this.ru.indexOf(key[i])

      s += abcTable[inputPosIndex][keyPosIndex]
    }
    return s;
  }

  createAbcTable(): string[] {
    const acc = [];
    const abc = this.ru;
    for (let i = 0; i < abc.length; i++) {
      acc[i] = abc
        .slice(i)
        .concat(abc.slice(0, i))
    }

    return acc
  }
}
