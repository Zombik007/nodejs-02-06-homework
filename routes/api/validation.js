const Joi = require('joi')

const schemaContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(14).required(),
})

const pattern = '\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}'

const schemaContactId = Joi.object({
  contactId: Joi.string().pattern(new RegExp(pattern)).required(),
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
