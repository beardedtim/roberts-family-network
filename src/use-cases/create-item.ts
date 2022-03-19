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
  created_at,
  last_updated,
}: {
  user: string
  data: any
  type: string
  created_at: string
  last_updated: string
}) => {
  log.trace(
    { user, data, type, created_at, last_updated },
    'Creating item in DB'
  )

  const { rows } = await DB.query(
    `
    INSERT INTO items
      (type, data, creator_id, created_at, last_updated)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING *
  `,
    [type, data, user, created_at, last_updated]
  )

  return rows[0] as SavedItem
}

export default createItem
