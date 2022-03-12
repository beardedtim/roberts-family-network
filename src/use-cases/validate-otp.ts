import { check } from '@app/connections/authenticator'
import { Model as Users } from '@app/domains/users'

const validateOTP = async (otp: string, username: string) => {
  const user = await Users.findByUsername(username)

  if (!user) {
    return false
  }

  return check(otp)
}

export default validateOTP
