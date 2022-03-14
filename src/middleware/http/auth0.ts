import { auth } from 'express-openid-connect'

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.EXTERNAL_URL,
  clientID: process.env.AUTH_ISSUER_CLIENT_ID,
  issuerBaseURL: process.env.AUTH_ISSUER_URL,
  secret: process.env.CLIENT_AUTH_SECRET,
}

export default auth(config)
