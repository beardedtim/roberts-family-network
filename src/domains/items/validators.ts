import Joi from 'joi'

const TextItem = Joi.object({
  type: Joi.valid('text').required(),
  raw: Joi.string().required(),
  created_at: Joi.string().isoDate().required(),
  last_updated: Joi.string().isoDate().required(),
})

const ImageItem = Joi.object({
  type: Joi.valid('image').required(),
  key: Joi.string().optional().allow(''),
  title: Joi.string().optional().allow(''),
  description: Joi.string().optional().allow(''),
  created_at: Joi.string().isoDate().required(),
  last_updated: Joi.string().isoDate().required(),
})

const ImageItemUpdate = Joi.object({
  type: Joi.valid('image').required(),
  title: Joi.string().optional().allow(''),
  description: Joi.string().optional().allow(''),
  created_at: Joi.string().isoDate().required(),
  last_updated: Joi.string().isoDate().required(),
})

const EventItem = Joi.object({
  type: Joi.valid('event').required(),
  created_at: Joi.string().isoDate().required(),
  last_updated: Joi.string().isoDate().required(),
  start_datetime: Joi.string().isoDate().required(),
  end_datetime: Joi.string().isoDate().required(),
  title: Joi.string().required(),
  description: Joi.string().optional().allow(''),
  address: Joi.string().required(),
  key: Joi.string().optional().allow(''),
})

export const create = Joi.object({
  user: Joi.string().uuid().required(),
  data: Joi.alternatives(TextItem, ImageItem, EventItem),
})

export const update = Joi.alternatives(TextItem, ImageItemUpdate, EventItem)
