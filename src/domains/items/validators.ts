import Joi from 'joi'

export const create = Joi.object({
  type: Joi.string().required(),
  data: Joi.any(),
  user: Joi.string().required().uuid(),
  // DB time is FOUR HOURS AHEAD
  created_at: Joi.string().isoDate().required(),
  last_updated: Joi.string().isoDate().required(),
})
