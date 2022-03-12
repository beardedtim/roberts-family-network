import Log from '@app/monitoring/log'

import emitItemsEvent from '@app/use-cases/emit-item-event'
import filterItemsByUser from '@app/use-cases/filter-items-by-user'
import findItemByAttribute from '@app/use-cases/find-item-by-attribute'

import * as Model from './model'
import { EVENTS } from './bus'

const log = Log.child({
  controller: 'items',
})

export const create = async (data: any) => {
  log.trace(data, 'creating an item')

  const item = await Model.create(data)

  await emitItemsEvent(EVENTS.CREATED, item)

  return item
}

export const getFeedForuser = async (user: string) => {
  log.trace({ user }, 'Generting Feed for user')

  const items = await filterItemsByUser({ user })

  return items
}

export const getById = async (id: string) => {
  log.trace({ id }, 'Getting Item by ID')

  const item = await findItemByAttribute('id', id)

  return item
}
