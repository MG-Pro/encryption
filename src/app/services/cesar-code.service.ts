import { Injectable } from '@angular/core';

@Injectable()
export class CesarCodeService {
  encrypt(inputString: string, key: number): string {
    const inputArray: string[] = inputString.split('')

    const abc: string[] = this.createAbc(inputArray)

    let outputString: string = ''

    inputArray.forEach((sym, i) => {
      const index = abc.findIndex(abcSym => abcSym === sym)

      let shiftIndex = index + key;

      const encryptedSymbolIndex = this.getEncryptedSymbolIndex(abc, shiftIndex)
      console.log(encryptedSymbolIndex)

      outputString += abc[encryptedSymbolIndex]
    })


    return outputString;
  }

  getEncryptedSymbolIndex(abc: string[], shiftIndex: number): number {
    let currentIndex = 1

    while (shiftIndex) {
      if(!abc[currentIndex]) {
        currentIndex = 0
      }

      if(!--shiftIndex) {
        return currentIndex
      }
      currentIndex++
    }
  }

  createAbc(inputArray: string[]): string[] {
    return inputArray.reduce((acc: string[], sym: string) => {
      !acc.includes(sym) && acc.push(sym)
      return acc
    }, [])
  }

}
