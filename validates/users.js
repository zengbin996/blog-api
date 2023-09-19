const { Joi, validate } = require('express-validation')

const register = {
  body: Joi.object({
    username: Joi.string().alphanum().min(5).max(20).required(),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .required(),
  }),
}

const login = {
  body: Joi.object({
    username: Joi.string().alphanum().min(5).max(20).required(),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .required(),
  }),
}

const resetPassword = {
  body: Joi.object({
    oldPassword: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .required(),
    newPassword: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .required(),
  }),
}

module.exports = {
  register: validate(register),
  login: validate(login),
  resetPassword: validate(resetPassword),
}
