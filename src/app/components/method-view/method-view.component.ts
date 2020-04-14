import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'app-method-view',
  templateUrl: './method-view.component.html',
  styleUrls: ['./method-view.component.scss']
})
export class MethodViewComponent {
  @Input() title: string
  @Input() keyType: string = 'num'

  @Input() encryptSource: string = ''
  @Input() decryptSource: string = ''
  @Input() encryptKey: number
  @Input() decryptKey: number

  @Input() encryptString: string = ''
  @Input() decryptString: string = ''

  @Output() encrypt: EventEmitter<object> = new EventEmitter<object>()
  @Output() decrypt: EventEmitter<object> = new EventEmitter<object>()

  @Output() encryptClean: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() decryptClean: EventEmitter<boolean> = new EventEmitter<boolean>()

  keyTip: string = this.keyType === 'string'
    ? 'Key (1 - 100)'
    : 'Key string'

  onEncryptClean() {
    this.encryptSource = ''
    this.encryptKey = 1
    this.encryptString = ''
    this.encryptClean.emit(true)
  }

  onDecryptClean() {
    this.decryptSource = ''
    this.decryptKey = 1
    this.decryptString = ''
    this.decryptClean.emit(true)
  }

  onEncrypt() {
    const encryptKey = this.keyType === 'num'
      ? this.encryptKey
      : this.encryptString

    if(!encryptKey) {
      return
    }

    this.encrypt.emit({
      encryptSource: this.encryptSource.trim(),
      encryptKey
    })
  }

  onDecrypt() {
    const decryptKey = this.keyType === 'num'
      ? this.decryptKey
      : this.decryptString
    if(!decryptKey) {
      return
    }

    this.decrypt.emit({
      decryptSource: this.decryptSource.trim(),
      decryptKey
    })
  }
}
