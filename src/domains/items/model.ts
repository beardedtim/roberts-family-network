import { SavedItem } from '@app/types'
import createItem from '@app/use-cases/create-item'
import deleteItemByID from '@app/use-cases/delete-item-by-id'
import findItemByAttribute from '@app/use-cases/find-item-by-attribute'
import updateItemById from '@app/use-cases/update-item-by-id'
import { create as createSchema, update as updateSchema } from './validators'

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
    type: 'image' | 'text' | 'event'
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
     * for alt text in Image type
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
    /**
     * The Event Start Datetime
     */
    start_datetime: string
    /**
     * The Event End Datetime
     */
    end_datetime: string
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

export const deleteById = deleteItemByID

export const findById = (id: string) => findItemByAttribute('id', id)

export const updateById = async (
  id: string,
  update: Partial<SavedItem['data']>
) => {
  await updateSchema.validateAsync(update)

  return updateItemById(id, update)
}
