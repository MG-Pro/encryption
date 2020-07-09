import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {SteganographyService} from '../../services/steganography.service'
import {KjbSteganographyService} from '../../services/kjb-steganography.service'

@Component({
  selector: 'app-kjb-steganography',
  templateUrl: './kjb-steganography.component.html',
  styleUrls: ['./kjb-steganography.component.scss']
})
export class KjbSteganographyComponent {

  @ViewChild('canvas', {static: false}) canvas: ElementRef;
  message: string = 'Hello!'
  isCompleteEncoded: boolean = false
  isCompleteDecoded: boolean = false
  isUploadDisabled: boolean = false
  image: string = ''
  decodedMessage: string = ''
  encodeKeys: number[] = [0, 0, 0]
  decodeKeys: number[] = [0, 0, 0]

  constructor(private codeService: KjbSteganographyService) {}

  ngAfterViewInit() {
    // this.codeService.init(this.canvas.nativeElement)
  }

  messageInputHandler() {
    this.isUploadDisabled = this.message.length <= 3
  }

  async encodeUploadHandler(e) {
    this.isCompleteEncoded = false
    // this.image = await this.codeService.encrypt(e.target.files[0], this.message, this.encodeKeys)
    this.isCompleteEncoded = true
  }

  async decodeUploadHandler(e) {
    this.isCompleteDecoded = false
    // this.decodedMessage = await this.codeService.decrypt(e.target.files[0], this.decodeKeys)
    this.isCompleteDecoded = true
  }

}
