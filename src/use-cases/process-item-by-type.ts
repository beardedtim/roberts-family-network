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

  if (item.type === 'event') {
    return {
      ...item,
      data: {
        ...item.data,
        url: item.data.key
          ? await getPublicFileUrl(item.data.key)
          : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIF.%252bW3l8B2joXhjIaxM%252f1bu0Q%26pid%3DApi&f=1',
      },
    }
  }

  return item
}

export default processItemByType
