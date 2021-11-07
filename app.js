const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const boolParser = require('express-query-boolean')
const helmet = require('helmet')
require('dotenv').config()
const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS
const { HttpCode } = require('./config/constants')

const usersRouter = require('./routes/users/users')
const contactsRouter = require('./routes/contacts/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(express.static(AVATAR_OF_USERS))
app.use(helmet())
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: 10000 }))
app.use(boolParser())

app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
})

app.use((err, req, res, next) => {
  console.log('🚀 ~ file: app.js ~ line 34 ~ app.use ~ res', res)
  console.log('🚀 ~ file: app.js ~ line 34 ~ app.use ~ err', err)
  const statusCode = err.status || HttpCode.INTERNAL_SERVER_ERROR
  res.status(statusCode).json({
    status: statusCode === HttpCode.INTERNAL_SERVER_ERROR ? 'fail' : 'error',
    code: statusCode,
    message: err.message,
  })
})

module.exports = app
