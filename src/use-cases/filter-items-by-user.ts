import Log from '@app/monitoring/log'
import DB from '@app/connections/database'
import { SavedItem } from '@app/types'

const log = Log.child({
  'use-case': 'filter-items-by-user',
})

const filterItemsByUser = async ({ user }: { user: string }) => {
  log.trace({ user }, 'Filtering items by user')
  const { rows } = await DB.query(
    `SELECT
      *
    FROM
      items
    WHERE
      creator_id = $1
    ORDER BY
      created_at DESC
  `,
    [user]
  )

  return rows as SavedItem[]
}

export default filterItemsByUser
