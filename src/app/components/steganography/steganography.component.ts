import {Component, ElementRef, ViewChild} from '@angular/core'
import {SteganographyService} from '../../services/steganography.service'

@Component({
  selector: 'app-steganography',
  templateUrl: './steganography.component.html',
  styleUrls: ['./steganography.component.scss']
})
export class SteganographyComponent {
  @ViewChild('canvas', {static: false}) canvas: ElementRef;
  message: string = 'Hello!'
  isCompleteEncoded: boolean = false
  isCompleteDecoded: boolean = false
  isUploadDisabled: boolean = false
  image: string = ''
  decodedMessage: string = ''

  constructor(private codeService: SteganographyService) {}

  ngAfterViewInit() {
    this.codeService.init(this.canvas.nativeElement)
  }

  messageInputHandler() {
    this.isUploadDisabled = this.message.length <= 3
  }

  async encodeUploadHandler(e) {
    this.isCompleteEncoded = false
    this.image = await this.codeService.encrypt(e.target.files[0], this.message)
    this.isCompleteEncoded = true
  }

  async decodeUploadHandler(e) {
    this.isCompleteDecoded = false
    this.decodedMessage = await this.codeService.decrypt(e.target.files[0])
    this.isCompleteDecoded = true
  }
}
