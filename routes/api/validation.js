const Joi = require('joi')
const { ValidInfoContact } = require('../../config/constant')

const schemaContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .min(ValidInfoContact.MIN)
    .max(ValidInfoContact.MAX)
    .required(),
  isFavorite: Joi.boolean().optional(),
})

const schemaContactId = Joi.object({
  contactId: Joi.string().required(),
})

const schemaStatusContact = Joi.object({
  isFavorite: Joi.boolean().required(),
})

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj)
    next()
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: 'error',
      code: 400,
      message: `missing required ${err.message.replace(/"/g, '')} field`,
    })
  }
}

module.exports.validateContact = async (req, res, next) => {
  return await validate(schemaContact, req.body, res, next)
}

module.exports.validateContactId = async (req, res, next) => {
  return await validate(schemaContactId, req.params, res, next)
}

module.exports.validateStatusContact = async (req, res, next) => {
  return await validate(schemaStatusContact, req.body, res, next)
}
