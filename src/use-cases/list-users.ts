import Log from '@app/monitoring/log'
import DB from '@app/connections/database'
import { SavedUser } from '@app/types'

const log = Log.child({
  'use-case': 'list-users',
})

const listUsers = async ({
  limit,
  offset,
  sort_col,
  sort_ord,
}: {
  limit: number
  offset: number
  sort_ord: 'desc' | 'asc'
  sort_col: 'username' | 'email'
}) => {
  log.trace({ limit, offset, sort_col, sort_ord }, 'Listing Users')
  const { rows } = await DB.query(
    `SELECT
      *
    FROM
      users
    ORDER BY
      ${sort_col} ${sort_ord}
    LIMIT
      ${limit}
    OFFSET
      ${offset}
    `
  )

  return rows as SavedUser[]
}

export default listUsers
