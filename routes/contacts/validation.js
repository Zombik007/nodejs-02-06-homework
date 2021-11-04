const Joi = require('joi')

const { ValidInfoContact, HttpCode } = require('../../config/constants')

const schemaContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .min(ValidInfoContact.MIN)
    .max(ValidInfoContact.MAX)
    .required(),
  isFavorite: Joi.boolean().optional(),
})

const schemaStatusContact = Joi.object({
  isFavorite: Joi.boolean().required(),
})

const schemaContactId = Joi.object({
  contactId: Joi.string().required(),
})

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj)
    next()
  } catch (err) {
    console.log(err)
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: `missing required ${err.message.replace(/"/g, '')} field`,
    })
  }
}

module.exports.validateContact = async (req, res, next) => {
  return await validate(schemaContact, req.body, res, next)
}

module.exports.validateStatusContact = async (req, res, next) => {
  return await validate(schemaStatusContact, req.body, res, next)
}

module.exports.validateContactId = async (req, res, next) => {
  return await validate(schemaContactId, req.params, res, next)
}
