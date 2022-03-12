import Log from '@app/monitoring/log'
import DB from '@app/connections/database'

const log = Log.child({
  'use-case': 'assign-user-role',
})

const assignUserRole = async ({
  user,
  role,
}: {
  user: string
  role: string
}) => {
  const { rows } = await DB.query(
    `
    INSERT INTO user_roles
      (user_id, role_id)
    VALUES
      ($1, $2)
  `,
    [user, role]
  )

  return rows[0]
}

export default assignUserRole
