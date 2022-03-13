import createItem from '@app/use-cases/create-item'
import { create as createSchema } from './validators'

export const create = async ({
  user,
  data,
  type,
  created_at,
  last_updated,
}: {
  user: string
  data: any
  type: string
  created_at: string
  last_updated: string
}) => {
  await createSchema.validateAsync({
    user,
    data,
    type,
    created_at,
    last_updated,
  })

  return createItem({
    user,
    data,
    type,
    created_at,
    last_updated,
  })
}

export const getRecentItemsByUser = async (userId: string) => {}
