import {Component} from '@angular/core'
import {CesarCodeService} from '../../services/cesar-code.service'

@Component({
  selector: 'app-cesar',
  templateUrl: './cesar.component.html',
  providers: [CesarCodeService]
})
export class CesarComponent {
  title: string = 'Cesar\'s encryption method'
  encryptSource: string = 'Мама мыла раму'
  decryptSource: string

  encryptKey: number = 1
  decryptKey: number = 1

  constructor(private codeService: CesarCodeService) {
  }

  onEncryptClean() {
    this.encryptSource = ''
    this.encryptKey = 1
  }

  onDecryptClean() {
    this.decryptSource = ''
    this.decryptKey = 1
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
