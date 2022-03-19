import Joi from 'joi'

const TextItem = Joi.object({
  type: Joi.valid('text').required(),
  raw: Joi.string().required(),
  created_at: Joi.string().isoDate().required(),
  last_updated: Joi.string().isoDate().required(),
})

const ImageItem = Joi.object({
  type: Joi.valid('image').required(),
  key: Joi.string().required(),
  title: Joi.string().optional().allow(''),
  description: Joi.string().optional().allow(''),
  created_at: Joi.string().isoDate().required(),
  last_updated: Joi.string().isoDate().required(),
})

export const create = Joi.object({
  user: Joi.string().uuid().required(),
  data: Joi.alternatives(TextItem, ImageItem),
})
