const { Joi, validate } = require('express-validation')

const register = {
  body: Joi.object({
    username: Joi.string().alphanum().min(5).max(20).required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{5,30}/)
      .required(),
  }),
}

const login = {
  body: Joi.object({
    username: Joi.string().alphanum().min(5).max(20).required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{5,30}/)
      .required(),
  }),
}

module.exports = {
  register: validate(register),
  login: validate(login),
}
