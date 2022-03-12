import Log from '@app/monitoring/log'
import viewRolesForUser from './view-roles-for-user'

const log = Log.child({
  'use-case': 'use-can-perform-action',
})

const userCanPerformAction = async ({
  user,
  object,
  action,
}: {
  user: string
  object: string
  action: string
}) => {
  log.trace({ user, object, action }, 'Validating user')
  const roles = await viewRolesForUser(user)

  if (roles.some(({ name }) => name === 'overlord' || name === 'admin')) {
    return true
  }

  return false
}

export default userCanPerformAction
