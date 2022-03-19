import { Router } from 'express'
import * as Controller from './controller'
import * as Middleware from '@app/middleware/http'

const router = Router()

router.post(
  '/',
  Middleware.authenticate,
  Middleware.onlyAuthenticated,
  Middleware.isAuthorized({
    action: 'CREATE',
    object: 'ITEMS',
  }),
  Middleware.fileUpload.any(),
  async (req, res, next) => {
    const user = req.user?.id

    let item: any = {
      user,
    }

    if (req.body.type === 'image') {
      if (!req.files) {
        return next(new Error('Bad input'))
      }

      const files = req.files as Express.MulterS3.File[]

      item.data = {
        type: 'image',
        key: files[0].key,
        title: req.body.title,
        description: req.body.description,
        created_at: req.body.created_at,
        last_updated: req.body.last_updated,
      }
    }

    if (req.body.type === 'text') {
      item.data = {
        type: 'text',
        raw: req.body.raw,
        created_at: req.body.created_at,
        last_updated: req.body.last_updated,
      }
    }

    const savedItem = await Controller.create(item)

    res.status(201).json({
      data: savedItem,
    })
  }
)

export default router
