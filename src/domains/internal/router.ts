import { Router } from 'express'
import * as Controller from './controller'
const router = Router()

router.get('/qrcodes/:id', async (req, res) => {
  const code = await Controller.generateQRCodeForUser(req.params.id)

  res.render('qr', {
    code,
    styles: [],
    scripts: [],
  })
})

export default router
