import Log from '@app/monitoring/log'
import DB from '@app/connections/database'
import { SavedItem } from '@app/types'

const log = Log.child({
  'use-case': 'get-feed-items-by-user',
})

const getFeedItemsByUser = async (user: string) => {
  log.trace({ user }, "Getting user's feed")

  const { rows } = await DB.query(
    `
    SELECT
      items.*,
      to_json(users.*) as author
    FROM
      items
    JOIN users
    ON items.creator_id = users.id
    WHERE
      is_public = true
    OR
      creator_id = $1
    GROUP BY
      items.id,
      users.id
    ORDER BY
      created_at DESC
  `,
    [user]
  )

  return rows as SavedItem[]
}

export default getFeedItemsByUser
