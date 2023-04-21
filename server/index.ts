import express from 'express'
import bodyParser from 'body-parser'
import userApi from './mongodb/schema/users/userApi'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/noteapi', userApi)

const server = require('http').createServer(app)

server.listen(2000, () => {
  console.log('server is ready on port 2000')
})
