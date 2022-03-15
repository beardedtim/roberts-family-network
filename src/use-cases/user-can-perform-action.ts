import Log from '@app/monitoring/log'
import viewRolesForUser from './view-roles-for-user'
import findUserByAttribute from './find-user-by-attribute'
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
  const dbUser = await findUserByAttribute('id', user)

  if (roles.some(({ name }) => name === 'overlord' || name === 'admin')) {
    return true
  }

  // If this is an update action
  if (action.indexOf('UPDATE') === 0) {
    const [type, id] = object.split('::')

    if (type === 'PROFILE') {
      if (dbUser.id === id) {
        return true
      }
    }
  }

  return false
}

export default userCanPerformAction
