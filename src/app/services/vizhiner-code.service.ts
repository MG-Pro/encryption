import { Injectable } from '@angular/core';

@Injectable()
export class VizhinerCodeService {

  constructor() { }
  encrypt(inputString: string, key: number): string {
    return this.crypt(inputString, key, 1)
  }

  decrypt(inputString: string, key: number): string {
    return this.crypt(inputString, key, -1)
  }

  crypt(inputString: string, key: number, direction: number): string {
    return ''
  }
}
