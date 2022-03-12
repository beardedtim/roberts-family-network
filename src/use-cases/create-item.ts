import Log from '@app/monitoring/log'
import DB from '@app/connections/database'
import { SavedItem } from '@app/types'

const log = Log.child({
  'use-case': 'create-item',
})

const createItem = async ({
  user,
  data,
  type,
}: {
  user: string
  data: any
  type: string
}) => {
  const { rows } = await DB.query(
    `
    INSERT INTO items
      (type, data, creator_id)
    VALUES
      ($1, $2, $3)
    RETURNING *
  `,
    [type, data, user]
  )

  return rows[0] as SavedItem
}

export default createItem
