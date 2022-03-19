import Log from '@app/monitoring/log'
import * as Internal from '@app/domains/internal'
import HTTP from '@app/connections/http'

import { Router as UserRouter, Model as UserModel } from '@app/domains/users'
import { Router as InternalRouter } from '@app/domains/internal'

import { formatDistance, format } from 'date-fns'

import {
  Router as ItemsRouter,
  Controller as ItemsController,
} from '@app/domains/items'

import * as Middleware from '@app/middleware/http'

const main = async () => {
  await Internal.Controller.init()

  HTTP.use('/api/users', UserRouter)
    .use('/internal', InternalRouter)
    .use('/items', ItemsRouter)

  HTTP.get(
    '/',
    Middleware.authenticate,
    Middleware.onlyAuthenticated,
    async (req, res) => {
      const items = await ItemsController.getFeedForUser(req.user?.id!)

      res.render('home', {
        items,
        formatDistance,
        styles: [
          'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/dark.min.css',
          'https://cdn.quilljs.com/1.3.6/quill.snow.css',
          '/css/home.css',
        ],
        scripts: [
          'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/highlight.min.js',
          'https://cdn.quilljs.com/1.3.6/quill.js',
          '/js/home.js',
        ],
      })
    }
  )

  HTTP.get(
    '/items/:id',
    Middleware.authenticate,
    Middleware.onlyAuthenticated,
    (req, res, next) => {
      const object = `ITEM::${req.params.id}`

      return Middleware.isAuthorized({
        action: 'VIEW',
        object,
      })(req, res, next)
    },
    async (req, res) => {
      const item = await ItemsController.getById(req.params.id)

      res.render('item', {
        item,
        styles: [
          'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/default.min.css',
          'https://cdn.quilljs.com/1.3.6/quill.snow.css',
          '/css/home.css',
        ],
        scripts: [
          'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/highlight.min.js',
          'https://cdn.quilljs.com/1.3.6/quill.js',
          '/js/home.js',
        ],
      })
    }
  )

  HTTP.get(
    '/members/:id',
    Middleware.authenticate,
    Middleware.onlyAuthenticated,
    async (req, res, next) => {
      try {
        const user = await UserModel.findById(req.params.id!)

        res.render('profile', {
          member: user,
          methods: {
            formatDate: format,
            parseTimestamp: (str: string) => {
              const [year, month, day] = str.split('-')

              return new Date(
                // year is normal
                Number(year),
                // MONTH IS 0 BASED INDEX
                Number(month) - 1,
                // day seems normal
                Number(day)
              )
            },
          },
          styles: ['/css/profile.css'],
          scripts: [],
        })
      } catch (e) {
        return next(e)
      }
    }
  )

  HTTP.listen(process.env.PORT, () => {
    Log.trace({ port: process.env.PORT }, 'Ready and listening')
  })
}

main()
