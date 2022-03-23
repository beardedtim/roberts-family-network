import Log from '@app/monitoring/log'

import emitItemsEvent from '@app/use-cases/emit-item-event'
import getFeedItemsByUser from '@app/use-cases/get-feed-items-by-user'
import processItemByType from '@app/use-cases/process-item-by-type'

import * as Model from './model'
import { EVENTS } from './bus'
import { SavedItem } from '@app/types'

const log = Log.child({
  controller: 'items',
})

export const create = async (data: any) => {
  log.trace(data, 'creating an item')

  const item = await Model.create(data)

  await emitItemsEvent(EVENTS.CREATED, item)

  return item
}

export const getFeedForUser = async (user: string) => {
  log.trace({ user }, 'Generting Feed for user')

  const items = await getFeedItemsByUser(user)

  return Promise.all(items.map(processItemByType))
}

export const getById = async (id: string) => {
  log.trace({ id }, 'Getting Item by ID')

  const item = await Model.findById(id)

  return processItemByType(item)
}

export const deleteById = async (id: string) => {
  log.trace({ id }, 'Deleting')

  const item = await Model.deleteById(id)

  await emitItemsEvent(EVENTS.DELETED, item)

  return item
}

export const updateById = async (
  id: string,
  update: Partial<SavedItem['data']>
) => {
  log.trace({ id, update }, 'Updating item')
  const item = await Model.updateById(id, update)

  await emitItemsEvent(EVENTS.UPDATED, item)
}
