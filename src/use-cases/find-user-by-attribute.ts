import Log from '@app/monitoring/log'
import DB from '@app/connections/database'
import { SavedUser } from '@app/types'

const log = Log.child({
  'use-case': 'find-user-by-attribute',
})

const findUserByAttribute = async (attribute: string, value: unknown) => {
  const { rows } = await DB.query(
    `SELECT
      *
    FROM
      users
    WHERE
      ${attribute} = $1`,
    [value]
  )

  return rows[0] as SavedUser
}

export default findUserByAttribute
