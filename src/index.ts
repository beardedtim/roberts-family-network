import Log from '@app/monitoring/log'
import * as Internal from '@app/domains/internal'
import HTTP from '@app/connections/http'

import { Router as UserRouter } from '@app/domains/users'
import { Router as InternalRouter } from '@app/domains/internal'
import * as Middleware from '@app/middleware/http'

const main = async () => {
  await Internal.Controller.init()

  HTTP.use('/users', UserRouter).use('/internal', InternalRouter)

  HTTP.get('/login', (_, res) => {
    res.render('login', {
      styles: ['/css/login.css'],
      scripts: ['/js/login.js'],
    })
  })

  HTTP.get(
    '/',
    Middleware.authenticate,
    Middleware.onlyAuthenticated,
    (_, res) => {
      res.render('home')
    }
  )

  HTTP.listen(process.env.PORT, () => {
    Log.trace({ port: process.env.PORT }, 'Ready and listening')
  })
}

main()
