const ValidInfoContact = {
  MIN: 10,
  MAX: 14,
}

const UserSubscription = {
  STARTER: 'starter',
  PRO: 'pro',
  BUSINESS: 'business',
}

const HttpCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUEST: 429,
  INTERNAL_SERVER_ERROR: 500,
}

const TokenLifeTime = {
  TOKEN_LIFE_TIME: 15 * 60 * 1000, // 15 minute
}

const LimitRequests = {
  LIMIT_REQUESTS: 3, // limit each IP to 100 requests per windowMs
}

module.exports = {
  ValidInfoContact,
  UserSubscription,
  HttpCode,
  TokenLifeTime,
  LimitRequests,
}
