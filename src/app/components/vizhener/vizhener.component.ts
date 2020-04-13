import { Component } from '@angular/core';
import {VizhinerCodeService} from '../../services/vizhiner-code.service'

@Component({
  selector: 'app-vizhener',
  templateUrl: './vizhener.component.html',
  providers: [VizhinerCodeService]
})
export class VizhenerComponent {
  title: string = 'Vizhener\'s encryption method'
  encryptSource: string = 'Мама мыла раму'
  decryptSource: string = ''

  encryptString: string = 'паскаль'
  decryptString: string = ''

  constructor(private codeService: VizhinerCodeService) {}

  onEncryptClean() {
    this.encryptSource = ''
    this.encryptString = ''
  }

  onDecryptClean() {
    this.decryptSource = ''
    this.decryptString = ''
  }

  onEncrypt(data) {
    const {encryptSource, encryptKey} = data;
    this.decryptSource = this.codeService.encrypt(encryptSource, encryptKey)
  }

  onDecrypt(data) {
    const {decryptSource, decryptKey} = data;
    this.encryptSource = this.codeService.decrypt(decryptSource, decryptKey)
  }
}
