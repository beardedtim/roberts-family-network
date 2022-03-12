import Log from '@app/monitoring/log'
import DB from '@app/connections/database'
import { SavedRole } from '@app/types'
const log = Log.child({
  'use-case': 'view-roles-for-user',
})

const findRoleByAttribute = async (user_id: string) => {
  const { rows } = await DB.query(
    `SELECT DISTINCT
      roles.name
    FROM
      roles, user_roles
    WHERE
      roles.id = user_roles.role_id
    AND
      user_roles.user_id = $1
      `,
    [user_id]
  )

  return rows as SavedRole[]
}

export default findRoleByAttribute
