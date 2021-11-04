const rateLimit = require('express-rate-limit')
const { HttpCode } = require('../config/constants')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute
  max: 3, // limit each IP to 100 requests per windowMs
  handler: (req, res, next) => {
    return res.status(HttpCode.TOO_MANY_REQUEST).json({
      status: 'error',
      code: HttpCode.TOO_MANY_REQUEST,
      message: 'Too many requests',
    })
  },
})

module.exports = limiter
