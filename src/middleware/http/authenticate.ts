import { RequestHandler } from 'express'
import { verify, JwtPayload } from 'jsonwebtoken'
import { SavedUser } from '@app/types'

const secret = process.env.JWT_SIGNING_SECRET!

const authenticate: RequestHandler = async (req, _, next) => {
  let token
  if (req.headers.authorization) {
    token = req.headers.authorization.replace('Bearer ', '')
  } else if (req.cookies.authorization) {
    token = req.cookies.authorization
  }

  if (token) {
    let user: SavedUser | undefined

    try {
      user = (await verify(token, secret)) as JwtPayload as SavedUser
    } catch (e) {}

    req.user = user
  }

  return next()
}

export default authenticate
