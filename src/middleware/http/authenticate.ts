import { RequestHandler } from 'express'
import { findByEmail } from '@app/domains/users/model'

const authenticate: RequestHandler = async (req, _, next) => {
  // @ts-ignore
  if (req.oidc.isAuthenticated()) {
    const oidcUser = req.oidc.user
    const dbUser = await findByEmail(oidcUser.email)

    // OpenID but not inside internal DB
    // FIX THIS!
    if (!dbUser) {
      return next()
    }

    const user = {
      ...oidcUser,
      ...dbUser,
    }

    req.user = user
  }

  return next()
}

export default authenticate
