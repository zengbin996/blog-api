const { Joi, validate } = require('express-validation')

const postPhotos = validate({
  body: Joi.object({
    url: Joi.array().required(),
    weight: Joi.number().min(0).max(10).default(0), //权重: 0-10, 默认 0
    location: Joi.string(),
    label: Joi.array(), //标签
  }),
})

module.exports = {
  postPhotos,
}
