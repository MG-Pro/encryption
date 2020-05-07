import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class SteganographyService {

  async encrypt(img: File, message: string) {

    const messageView = this.getMessageView(message)
    const imageView = await this.getImgView(img)
    // console.log(imageView)


    const decoder = new TextDecoder('utf8')
    const a = decoder.decode(imageView)
    console.log(a)
    return btoa(unescape(encodeURIComponent(a)))
  }

  getMessageView(message: string): Uint8Array {
    const encoder = new TextEncoder()
    return encoder.encode(message)
  }

  getImgView(img: File): Promise<any> {
    return new Promise<any>(done => {
      const fr = new FileReader()
      type EventReader = Event & {target: {result: ArrayBuffer}}
      fr.addEventListener('load', (e: EventReader) => done(new Uint8ClampedArray(e.target.result)))
      fr.readAsArrayBuffer(img)
    })
  }


}
