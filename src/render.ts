import { Router } from 'express'

import { Model as UserModel } from '@app/domains/users'
import userCanPerformAction from '@app/use-cases/user-can-perform-action'

import { formatDistance, format } from 'date-fns'

import { marked } from 'marked'

import { Controller as ItemsController } from '@app/domains/items'
import { Controller as UserController } from '@app/domains/users'

import * as Middleware from '@app/middleware/http'

import type { RequestHandler } from 'express'

const router = Router()

const renderHome: RequestHandler = async (req, res) => {
  const items = await ItemsController.getFeedForUser(req.user?.id!)
  const users = await UserController.listAll()

  res.render('home', {
    items,
    users,
    methods: {
      formatDistance,
      format,
      formatDate: format,
    },
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

const renderViewItem: RequestHandler = async (req, res) => {
  const item = await ItemsController.getById(req.params.id)
  const users = await UserController.listAll()

  res.render('item', {
    item,
    users,
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
      parseMarkdown: marked.parse,
    },
    canEdit: await userCanPerformAction({
      user: req.user?.id || '',
      action: 'UPDATE',
      object: `ITEM::${req.params.id}`,
    }),
    styles: [
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/default.min.css',
      'https://cdn.quilljs.com/1.3.6/quill.snow.css',
      '/css/home.css',
      '/css/item.css',
    ],
    scripts: [
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/highlight.min.js',
      'https://cdn.quilljs.com/1.3.6/quill.js',
      '/js/home.js',
    ],
  })
}

const editItem: RequestHandler = async (req, res) => {
  const item = await ItemsController.getById(req.params.id)
  const users = await UserController.listAll()

  res.render('edit-item', {
    item,
    users,
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
      parseMarkdown: marked.parse,
    },
    styles: [
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/default.min.css',
      'https://cdn.quilljs.com/1.3.6/quill.snow.css',
      '/css/home.css',
      '/css/item.css',
    ],
    scripts: [
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/highlight.min.js',
      'https://cdn.quilljs.com/1.3.6/quill.js',
      '/js/edit-item.js',
    ],
  })
}

const viewMember: RequestHandler = async (req, res, next) => {
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

router.get(
  '/',
  Middleware.authenticate,
  Middleware.onlyAuthenticated,
  renderHome
)

router.get(
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
  renderViewItem
)

router.get(
  '/items/:id/edit',
  Middleware.authenticate,
  Middleware.onlyAuthenticated,
  (req, res, next) => {
    const object = `ITEM::${req.params.id}`

    return Middleware.isAuthorized({
      action: 'UPDATE',
      object,
    })(req, res, next)
  },
  editItem
)

router.get(
  '/members/:id',
  Middleware.authenticate,
  Middleware.onlyAuthenticated,
  (req, res, next) => {
    const object = `USER::${req.params.id}`

    return Middleware.isAuthorized({
      action: 'VIEW',
      object,
    })(req, res, next)
  },
  viewMember
)

export default router
