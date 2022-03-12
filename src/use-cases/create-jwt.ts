import { SavedUser } from '@app/types'
import { sign } from 'jsonwebtoken'

const secret = process.env.JWT_SIGNING_SECRET!

const createJWT = (user: SavedUser) => sign(user, secret)

export default createJWT
