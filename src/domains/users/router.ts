import { Router, json } from 'express'
import * as Controller from './controller'
import * as Middleware from '@app/middleware/http'

const router = Router()

export default router.patch(
  '/:id/profile',
  Middleware.authenticate,
  Middleware.onlyAuthenticated,
  async (req, res, next) => {
    Middleware.isAuthorized({
      action: 'UPDATE',
      object: `PROFILE::${req.params.id}`,
    })(req, res, next)
  },
  json(),
  async (req, res, next) => {
    try {
      const updatedUser = await Controller.updateUserProfile(
        req.params.id,
        req.body
      )

      res.json({
        data: updatedUser,
      })
    } catch (e) {
      return next(e)
    }
  }
)
