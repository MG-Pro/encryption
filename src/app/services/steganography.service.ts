import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class SteganographyService {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  public init(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')
    this.canvas = canvas
  }

  public async encrypt(img: File, message: string) {
    const messageView = this.getMessageView(message)
    const imageView = await this.getImgView(img)
    const imgData = this.writeBytes(messageView, imageView)
    this.ctx.putImageData(imgData, 0, 0)
    return this.canvas.toDataURL()
  }

  public async decrypt(img: File) {
    const imageView = await this.getImgView(img)
    const textData = this.readBytes(imageView)
    const decoder = new TextDecoder()
    return decoder.decode(textData)
  }

  private getMessageView(message: string): Uint8Array {
    const encoder = new TextEncoder()
    return encoder.encode(message)
  }

  private getImgView(img: File): Promise<any> {
    return new Promise<any>(done => {
      const fr = new FileReader()
      type EventReader = Event & { target: { result: string } }
      fr.addEventListener('load', (e: EventReader) => {
        const img = new Image()
        img.src = e.target.result
        img.onload = () => {
          this.ctx.drawImage(img, 0, 0)
          const clampedArray = this.ctx.getImageData(0, 0, this.canvas.height, this.canvas.width)
          done(clampedArray)
        }
      })
      fr.readAsDataURL(img)
    })
  }

  private writeBytes(messageView, imageView) {
    let index = 0
    const copiedImageViewData =  Uint8ClampedArray.from(imageView.data)
    const length = messageView.length

    for (let i = 0; i < length; i++) {
      if (i == 0) {
        const secretLength = length * 4

        if (secretLength > 255) {
          const division = secretLength / 255
          if (division % 1 === 0) {
            for (let k = 0; k < division; k++) {
              copiedImageViewData[k] = 255
              index++
            }
          } else {

            const firstPortion = +division.toString().split('.')[0]

            let indexK = 0
            for (let k = 0; k < firstPortion; k++) {
              copiedImageViewData[k] = 255
              index++
              indexK = k
            }

            copiedImageViewData[indexK] = Math.round((division - firstPortion) * 255)
            index++
          }

        } else {
          copiedImageViewData[0] = secretLength
          index++
        }
      }

      const asciiCode = messageView[i]
      const first2bit = (asciiCode & 0x03)
      const first4bitMiddle = (asciiCode & 0x0C) >> 2
      const first6bitMiddle = (asciiCode & 0x30) >> 4
      const first8bitMiddle = (asciiCode & 0xC0) >> 6

      replaceByte(first2bit)
      replaceByte(first4bitMiddle)
      replaceByte(first6bitMiddle)
      replaceByte(first8bitMiddle)

      function replaceByte(bits) {
        copiedImageViewData[index] = (copiedImageViewData[index] & 0xFC) | bits
        index++
      }
    }

    return new ImageData(copiedImageViewData, imageView.width, imageView.height)
  }

  private readBytes(imageView) {

    let totalLength = 0
    let lastIndex
    const viewLength = imageView.data.length
    for(let b = 0; b < viewLength; b++) {
      if(imageView.data[b] == 255) {
        totalLength += imageView.data[b]
        if(imageView.data[b + 1] < 255) {
          totalLength += imageView.data[b + 1]
          lastIndex = b + 1
          break
        }
      } else {
        totalLength += imageView.data[b]
        lastIndex = b
        break
      }
    }

    const secretLength = totalLength

    const newUint8Array = new Uint8Array(totalLength / 4)
    let j = 0

    for(let i = (lastIndex + 1); i < secretLength; i = i + 4) {

      const aShift = (imageView.data[i] & 3)
      const bShift = (imageView.data[i + 1] & 3) << 2
      const cShift = (imageView.data[i + 2] & 3) << 4
      const dShift = (imageView.data[i + 3] & 3) << 6

      newUint8Array[j] = (((aShift | bShift) | cShift) | dShift)
      j++
    }

    return newUint8Array
  }
}
