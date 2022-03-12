import qrcode from 'qrcode'
import { keyURI } from '@app/connections/authenticator'

const generate = async (username: string) => {
  const otpauth = await keyURI(username)

  return new Promise((res, rej) => {
    qrcode.toDataURL(otpauth, (err, imageUrl) => {
      if (err) {
        rej(err)
      } else {
        res(imageUrl)
      }
    })
  })
}

export default generate
