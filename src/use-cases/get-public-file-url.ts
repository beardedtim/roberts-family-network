import BlockStorage from '@app/connections/block-storage'

export const getPublicURLFor = (file: string) =>
  BlockStorage.getSignedUrl('getObject', {
    Bucket: process.env.BLOCK_STORAGE_NAME!,
    Key: file,
  })

export default getPublicURLFor
