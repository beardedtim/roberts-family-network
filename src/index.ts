import Log from '@app/monitoring/log'
import * as Internal from '@app/domains/internal'
import HTTP from '@app/connections/http'

import { Router as UserRouter } from '@app/domains/users'
import { Router as InternalRouter } from '@app/domains/internal'

import { Router as ItemsRouter } from '@app/domains/items'
import Render from '@app/render'

const main = async () => {
  await Internal.Controller.init()

  HTTP.use('/api/users', UserRouter)
    .use('/internal', InternalRouter)
    .use('/items', ItemsRouter)
    .use(Render)

  HTTP.listen(process.env.PORT, () => {
    Log.trace({ port: process.env.PORT }, 'Ready and listening')
  })
}

main()
