import { Router, json } from 'express'
import * as Controller from './controller'

const router = Router()

export default router
  .get('/', async (req, res, next) => {
    try {
      const { limit = 100, offset = 0 } = req.query
      res.json({
        data: await Controller.list({
          limit: Number(limit),
          offset: Number(offset),
        }),
      })
    } catch (e) {
      return next(e)
    }
  })
  .post('/otps/validate', json(), async (req, res) => {
    const { code, username } = req.body

    const valid = await Controller.validatePasscode({ code, username })

    if (!valid) {
      return res.status(400).json({
        error: {
          message: 'Bad Code or Username',
        },
      })
    }

    const token = await Controller.createTokenForUsername(username)

    res.cookie('authorization', token)

    res.status(200).json({
      data: {
        valid: true,
        token,
      },
    })
  })
  .get('/logout', async (req, res) => {
    res.clearCookie('authorization')

    res.redirect('/')
  })
