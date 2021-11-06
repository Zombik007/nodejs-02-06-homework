const rateLimit = require('express-rate-limit')
const {
  HttpCode,
  TokenLifeTime,
  LimitRequests,
} = require('../config/constants')

const limiter = rateLimit({
  windowMs: TokenLifeTime.TOKEN_LIFE_TIME,
  max: LimitRequests,
  handler: (req, res, next) => {
    return res.status(HttpCode.TOO_MANY_REQUEST).json({
      status: 'error',
      code: HttpCode.TOO_MANY_REQUEST,
      message: 'Too many requests',
    })
  },
})

module.exports = limiter
