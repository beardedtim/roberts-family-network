import { RequestHandler } from 'express'

const onlyAuthenticated: RequestHandler = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login')
  }

  return next()
}

export default onlyAuthenticated
