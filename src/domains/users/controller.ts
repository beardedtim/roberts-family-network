import Log from '@app/monitoring/log'

import emitUserEvent from '@app/use-cases/emit-user-event'
import validateOTP from '@app/use-cases/validate-otp'
import createJWT from '@app/use-cases/create-jwt'
import findAllUsers from '@app/use-cases/find-all-users'

import {
  validateOTP as validateOTPInput,
  userProfileUpdate,
} from './validators'
import * as Model from './model'
import { EVENTS } from './bus'

const log = Log.child({
  controller: 'users',
})

export const create = async (data: any) => {
  log.trace('Creating user')

  const user = await Model.create(data)

  await emitUserEvent(EVENTS.CREATED, user)

  return user
}

export const list = async ({
  limit,
  offset,
}: {
  limit?: number
  offset?: number
}) =>
  Model.list({
    limit,
    offset,
  })

export const validatePasscode = async ({
  code,
  username,
}: {
  code: string
  username: string
}) => {
  await validateOTPInput.validateAsync({ code, username })

  return validateOTP(code, username)
}

export const createTokenForUsername = async (username: string) => {
  const user = await Model.findByUsername(username)

  return createJWT(user)
}

export const updateUserProfile = async (
  id: string,
  update: { [x: string]: any }
) => {
  if (Object.keys(update).length === 0) {
    return Model.findById(id)
  }
  await userProfileUpdate.validateAsync(update)

  const updatedUser = await Model.updateProfileById(id, update)

  return updatedUser
}

export const listAll = async () => findAllUsers()
