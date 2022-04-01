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
    try {
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

      if (req.body.type === 'event') {
        item.data = {
          type: 'event',
          title: req.body.title,
          description: req.body.description,
          address: req.body.address,
          created_at: req.body.created_at,
          last_updated: req.body.last_updated,
          start_datetime: req.body.start_datetime,
          end_datetime: req.body.end_datetime,
          responsbility_list: req.body.responsbility_list.map((str: string) => {
            const [id, responsbility] = str.split(',')

            return {
              id,
              responsbility,
            }
          }),
        }

        const files = req.files as Express.MulterS3.File[]

        // if they sent a photo
        if (files[0]) {
          console.log('I AM SETTING IT')
          item.data.key = files[0].key
        }
      }

      const savedItem = await Controller.create(item)

      res.status(201).json({
        data: savedItem,
      })
    } catch (e) {
      return next(e)
    }
  }
)

router.delete(
  '/:id',
  Middleware.authenticate,
  Middleware.onlyAuthenticated,
  async (req, res, next) => {
    console.log(req.url, req.headers, req.params)
    Middleware.isAuthorized({
      action: 'DELETE',
      object: `ITEM::${req.params.id}`,
    })(req, res, next)
  },
  async (req, res, next) => {
    try {
      const deleted = await Controller.deleteById(req.params.id)

      res.status(200).json({
        data: deleted,
      })
    } catch (e) {
      return next(e)
    }
  }
)

router.put(
  '/:id',
  Middleware.authenticate,
  Middleware.onlyAuthenticated,
  (req, res, next) => {
    return Middleware.isAuthorized({
      action: 'UPDATE',
      object: `ITEM::${req.params.id}`,
    })(req, res, next)
  },
  Middleware.fileUpload.any(),
  async (req, res, next) => {
    try {
      let item: any = {}
      if (req.body.type === 'image') {
        if (!req.files) {
          return next(new Error('Bad input'))
        }

        item = {
          type: 'image',
          title: req.body.title,
          description: req.body.description,
          created_at: req.body.created_at,
          last_updated: req.body.last_updated,
        }
      }

      if (req.body.type === 'text') {
        item = {
          type: 'text',
          raw: req.body.raw,
          created_at: req.body.created_at,
          last_updated: req.body.last_updated,
        }
      }

      if (req.body.type === 'event') {
        item = {
          type: 'event',
          title: req.body.title,
          description: req.body.description,
          address: req.body.address,
          created_at: req.body.created_at,
          last_updated: req.body.last_updated,
          start_datetime: req.body.start_datetime,
          end_datetime: req.body.end_datetime,
          responsbility_list: req.body.responsbility_list.map((str: string) => {
            const [id, responsbility] = str.split(',')

            return {
              id,
              responsbility,
            }
          }),
        }

        const files = req.files as Express.MulterS3.File[]

        // if they sent a photo
        if (files[0]) {
          item.data.key = files[0].key
        }
      }

      const updated = await Controller.updateById(req.params.id, item)

      res.status(200).json({
        data: updated,
      })
    } catch (e) {
      return next(e)
    }
  }
)

export default router
