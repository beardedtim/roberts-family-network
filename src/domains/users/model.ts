import createUser from '@app/use-cases/create-user'
import findUserByAttribute from '@app/use-cases/find-user-by-attribute'
import viewRolesForUser from '@app/use-cases/view-roles-for-user'
import assignUserRole from '@app/use-cases/assign-user-role'
import listUsers from '@app/use-cases/list-users'
import { newUser, listUsersQuery } from './validators'

export const create = async ({
  username,
  email,
}: {
  username: string
  email: string
}) => {
  await newUser.validateAsync({ username, email })

  return createUser({ username, email })
}

export const list = async ({
  limit = 100,
  offset = 0,
  sort_ord = 'desc',
  sort_col = 'username',
} = {}) => {
  await listUsersQuery.validateAsync({
    limit,
    offset,
    sort_ord,
    sort_col,
  })

  return listUsers({
    limit,
    offset,
    sort_col: sort_col as 'username' | 'email',
    sort_ord: sort_ord as 'asc' | 'desc',
  })
}

export const findById = (id: string) => findUserByAttribute('id', id)

export const findByEmail = (email: string) =>
  findUserByAttribute('email', email)

export const findByUsername = (username: string) =>
  findUserByAttribute('username', username)

export const roles = viewRolesForUser

export const addRole = (user_id: string, role_id: string) =>
  assignUserRole({
    user: user_id,
    role: role_id,
  })
