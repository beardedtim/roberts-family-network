import { authenticator } from 'otplib'
const secret = process.env.AUTHENTICATOR_SECRET!

export const generate = () => authenticator.generate(secret)
export const check = (token: string) => authenticator.check(token, secret)
export const keyURI = (name: string) =>
  authenticator.keyuri(name, 'Roberts Family Network', secret)
