const { Joi, validate } = require('express-validation')
const regexGetter = require('../regexList')

const addUser = validate({
  body: Joi.object({
    username: Joi.string().alphanum().min(5).max(20).required(),
    password: Joi.string().regex(regexGetter('password')).required(),
  }),
})

const AuthSign = validate({
  body: Joi.object({
    username: Joi.string().alphanum().min(5).max(20).required(),
    password: Joi.string().regex(regexGetter('password')).required(),
  }),
})

const updateUser = validate({
  body: Joi.object({
    username: Joi.string().alphanum().min(5).max(20).required(),
    oldPassword: Joi.string().regex(regexGetter('password')).required(),
    newPassword: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .required(),
  }),
})

module.exports = {
  addUser,
  AuthSign,
  updateUser,
}
