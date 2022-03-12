import Joi from 'joi'

export const create = Joi.object({
  type: Joi.string().required(),
  data: Joi.any(),
  user: Joi.string().required().uuid(),
})
