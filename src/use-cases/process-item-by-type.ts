import { SavedItem } from '@app/types'
import getPublicFileUrl from '@app/use-cases/get-public-file-url'

const processItemByType = async (item: SavedItem) => {
  if (item.type === 'image') {
    return {
      ...item,
      data: {
        ...item.data,
        url: await getPublicFileUrl(item.data.key),
      },
    }
  }

  return item
}

export default processItemByType
