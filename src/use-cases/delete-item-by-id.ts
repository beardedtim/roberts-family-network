import Log from '@app/monitoring/log'
import DB from '@app/connections/database'
import { SavedItem } from '@app/types'

const log = Log.child({
  'use-case': 'delete-item-by-id',
})

const deleteItemByID = async (id: string) => {
  log.trace({ id }, 'Deleting Item by its ID')

  const { rows } = await DB.query(
    `DELETE FROM
      items
    WHERE
      id = $1
    RETURNING
      *`,
    [id]
  )

  return rows[0] as SavedItem
}

export default deleteItemByID
