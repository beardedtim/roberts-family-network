import Log from '@app/monitoring/log'
import DB from '@app/connections/database'
import { SavedRole } from '@app/types'

const log = Log.child({
  'use-case': 'find-role-by-attribute',
})

const findRoleByAttribute = async (attribute: string, value: unknown) => {
  log.trace({ attribute, value }, 'Finding by attribute')

  const { rows } = await DB.query(
    `SELECT
      *
    FROM
      roles
    WHERE
      ${attribute} = $1`,
    [value]
  )

  return rows[0] as SavedRole
}

export default findRoleByAttribute
