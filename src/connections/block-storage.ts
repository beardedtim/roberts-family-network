import AWS from 'aws-sdk'
import { Readable } from 'stream'

const spacesEndpoint = new AWS.Endpoint(process.env.BLOCK_STORAGE_ENDPOINT!)

const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.BLOCK_STORAGE_AUTH_KEY,
  secretAccessKey: process.env.BLOCK_STORAGE_AUTH_SECRET,
})

export default s3
