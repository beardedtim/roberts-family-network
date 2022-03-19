import createItem from '@app/use-cases/create-item'
import { create as createSchema } from './validators'

interface NewItem {
  /**
   * The User ID that created
   * this Item
   */
  user: string
  data: {
    /**
     * What type of Item is this?
     */
    type: 'image' | 'text'
    /**
     * When did the Client think
     * they created this?
     */
    created_at: string
    /**
     * When did the Client say
     * they last updated this?
     */
    last_updated: string
    /**
     * What is a plain-text, human
     * readable description? Used
     * for alt text
     */
    description?: string
    /**
     * What is a title for this?
     */
    title?: string
    /**
     * The Block Storage Key that this
     * Item Represents
     */
    key?: string
    /**
     * The Raw Text, that may be mark up
     * or some other _thing_ that this
     * Item represents
     */
    raw?: string
  }
}

export const create = async ({ user, data }: NewItem) => {
  await createSchema.validateAsync({ user, data })

  const { type, created_at, last_updated, ...unknown } = data

  const item = {
    user,
    type,
    created_at,
    last_updated,
    data: unknown,
  }

  return createItem(item)
}

export const getRecentItemsByUser = async (userId: string) => {}
