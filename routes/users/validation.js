const Joi = require('joi')
const { HttpCode } = require('../../config/constants')

const schemaUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.number().required(),
})

const validateUser = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj)
    next()
  } catch (error) {
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'missing required name field',
    })
  }
}

module.exports.validateUser = async (req, res, next) => {
  return await validateUser(schemaUser, req.body, res, next)
}
