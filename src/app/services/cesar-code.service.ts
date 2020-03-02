import { Injectable } from '@angular/core';

@Injectable()
export class CesarCodeService {
  encrypt(inputString: string, key: number): string {
    return this.crypt(inputString, key, 1)
  }

  decrypt(inputString: string, key: number): string {
    return this.crypt(inputString, key, -1)
  }

  crypt(inputString: string, key: number, direction: number): string {
    const inputArray: string[] = inputString.split('')
    const abc: string[] = this.createAbc(inputArray)

    return inputArray.reduce((acc, sym) => {
      const index = abc.findIndex(abcSym => abcSym === sym)
      const shiftIndex = index + key * direction;
      const encryptedSymbolIndex = !abc[shiftIndex]
        ? shiftIndex - abc.length * direction
        : shiftIndex

      acc += abc[encryptedSymbolIndex]
      return acc
    }, '')
  }
  createAbc(inputArray: string[]): string[] {
    return inputArray.reduce((acc: string[], sym: string) => {
      !acc.includes(sym) && acc.push(sym)
      return acc
    }, [])
  }
}
