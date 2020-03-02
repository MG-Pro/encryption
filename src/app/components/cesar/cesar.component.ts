import {Component, OnInit} from '@angular/core'
import {CesarCodeService} from '../../services/cesar-code.service'

@Component({
  selector: 'app-cesar',
  templateUrl: './cesar.component.html',
  styleUrls: ['./cesar.component.scss'],
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

  onEncrypt() {
    this.decryptSource = this.codeService.encrypt(this.encryptSource.trim(), this.encryptKey)
  }

  onDecrypt() {
    this.encryptSource = this.codeService.decrypt(this.decryptSource.trim(), this.decryptKey)
  }

}
