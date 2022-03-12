import { Router, json } from 'express'
import * as Controller from './controller'
import * as Middleware from '@app/middleware/http'

const router = Router()

router.post(
  '/',
  json(),
  Middleware.authenticate,
  Middleware.onlyAuthenticated,
  Middleware.isAuthorized({
    action: 'CREATE',
    object: 'ITEMS',
  }),
  async (req, res) => {
    const user = req.user?.id

    const item = await Controller.create({
      user,
      data: req.body.payload,
      type: req.body.type,
    })

    res.status(201).json({
      data: item,
    })
  }
)

export default router
