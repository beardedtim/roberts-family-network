import express from 'express'
import cookies from 'cookie-parser'
import * as Middleware from '@app/middleware/http'

const server = express()

server.set('view engine', 'ejs')

server.use((req, res, next) => {
  const render = res.render.bind(res)

  res.render = (path: string, args = {}) => {
    const {
      styles = [],
      scripts = [],
      ...rest
    } = args as {
      styles?: string[]
      scripts?: string[]
    }

    return render(path, {
      ...rest,
      scripts: [...new Set(['/js/main.js', ...scripts])],
      styles: [...new Set(['/css/global.css', ...styles])],
      user: req.user,
    })
  }

  return next()
})

server.use(cookies())

server.use(express.static('public'))

server.use(Middleware.auth0)

export default server
