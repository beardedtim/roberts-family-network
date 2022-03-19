import BlockStorage from '@app/connections/block-storage'
import Multer from 'multer'
import MulterS3 from 'multer-s3'
import randomWords from 'random-words'

const generateFileName = (req: Express.Request, file: Express.Multer.File) =>
  `${req.user?.username}/${randomWords({ exactly: 5, join: '-' })}/${
    file.originalname
  }`

const fileUpload = Multer({
  storage: MulterS3({
    s3: BlockStorage,
    bucket: process.env.BLOCK_STORAGE_NAME!,
    acl: 'private',
    key: async (req, file, cb) => {
      console.dir(req)
      console.dir(file)

      return cb(null, generateFileName(req, file))
    },
  }),
})

export default fileUpload
