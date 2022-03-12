import createItem from '@app/use-cases/create-item'
import { create as createSchema } from './validators'

export const create = async ({
  user,
  data,
  type,
}: {
  user: string
  data: any
  type: string
}) => {
  await createSchema.validateAsync({
    user,
    data,
    type,
  })

  return createItem({
    user,
    data,
    type,
  })
}

export const getRecentItemsByUser = async (userId: string) => {}
