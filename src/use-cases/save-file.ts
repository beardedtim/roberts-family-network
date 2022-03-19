import BlockStorage from '@app/connections/block-storage'
import { Readable } from 'stream'

export const save = (
  file: Buffer | Uint8Array | Blob | string | Readable,
  key: string
) =>
  BlockStorage.putObject({
    Bucket: process.env.BLOCK_STORAGE_NAME!,
    Key: key,
    Body: file,
  }).promise()

export default save
