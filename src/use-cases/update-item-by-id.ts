import Log from '@app/monitoring/log'
import DB from '@app/connections/database'
import findItemByAttribute from './find-item-by-attribute'
import { SavedItem } from '@app/types'

const log = Log.child({
  'use-case': 'update-item-by-id',
})

const updateItemById = async (
  id: string,
  update: Partial<SavedItem>
): Promise<SavedItem> => {
  log.trace({ id, update }, 'Updating database')
  const { data } = await findItemByAttribute('id', id)

  const { rows } = await DB.query(
    `
    UPDATE
      items
    SET
      data = $1
    WHERE
      id = $2
    RETURNING
      *
  `,
    [Object.assign({}, data, update), id]
  )

  return rows[0] as SavedItem
}

export default updateItemById
