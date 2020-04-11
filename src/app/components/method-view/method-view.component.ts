import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'app-method-view',
  templateUrl: './method-view.component.html',
  styleUrls: ['./method-view.component.scss']
})
export class MethodViewComponent {
  @Input() title: string
  @Input() encryptSource: string
  @Input() decryptSource: string
  @Input() encryptKey: number
  @Input() decryptKey: number

  @Output() encrypt: EventEmitter<object> = new EventEmitter<object>()
  @Output() decrypt: EventEmitter<object> = new EventEmitter<object>()

  @Output() encryptClean: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() decryptClean: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor() {}

  onEncryptClean() {
    this.encryptSource = ''
    this.encryptKey = 1
    this.encryptClean.emit(true)
  }

  onDecryptClean() {
    this.decryptSource = ''
    this.decryptKey = 1
    this.decryptClean.emit(true)
  }

  onEncrypt() {
    this.encrypt.emit({
      encryptSource: this.encryptSource.trim(),
      encryptKey: this.encryptKey
    })
  }

  onDecrypt() {
    this.decrypt.emit({
      decryptSource: this.decryptSource.trim(),
      decryptKey: this.decryptKey
    })
  }
}
