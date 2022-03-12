import { RequestHandler } from 'express'
import userCanPerformAction from '@app/use-cases/user-can-perform-action'

const isAuthorized =
  ({ action, object }: { action: string; object: string }): RequestHandler =>
  async (req, _, next) => {
    const authorized = await userCanPerformAction({
      user: req.user?.id!,
      action,
      object,
    })

    if (authorized) {
      return next()
    }

    const error: Error & { statusCode?: number } = new TypeError(
      `Not Authorized`
    )

    error.statusCode = 403

    return next(error)
  }

export default isAuthorized
