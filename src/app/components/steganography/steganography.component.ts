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

  constructor(private codeService: SteganographyService) {}

  messageInputHandler() {
    this.isUploadDisabled = this.message.length <= 3
  }

  async fileUploadHandler(e) {
    const result = await this.codeService.encrypt(e.target.files[0], this.message)
    this.image = 'data:image/png;base64,' + result
    // console.log('data:image/png;base64,' + result)
  }
}
