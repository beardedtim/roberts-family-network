import Joi from 'joi'

export const newUser = Joi.object({
  username: Joi.string().required().min(3),
  email: Joi.string().required().email(),
})

export const listUsersQuery = Joi.object({
  limit: Joi.number().required().max(1000).min(1),
  offset: Joi.number().required().min(0),
  sort_ord: Joi.valid('desc', 'asc').required(),
  sort_col: Joi.valid('username', 'email').required(),
})

export const validateOTP = Joi.object({
  code: Joi.string().required(),
  username: Joi.string().required().min(3),
})

export const userProfileUpdate = Joi.object({
  birthday: Joi.string().optional().allow(''),
  phone: Joi.string().optional().allow(''),
  address1: Joi.string().optional().allow(''),
  address2: Joi.string().optional().allow(''),
  city: Joi.string().optional().allow(''),
  state: Joi.string().optional().allow(''),
  zip: Joi.string().optional().allow(''),
})
