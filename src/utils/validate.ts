import * as JSONSchema from 'jsonschema'

class ValidationError extends Error {
  constructor(reasons: JSONSchema.ValidationError[]) {
    super()

    this.message = `Failed validation due to: ${reasons
      .map((value) => value.message)
      .join('\n')}`
  }
}

const validate = (
  objectSchema: {
    [name: string]: JSONSchema.Schema
  },
  value: unknown
) => {
  const valid = JSONSchema.validate(
    {
      type: 'object',
      properties: objectSchema,
    },
    value
  )

  if (valid.errors) {
    throw new ValidationError(valid.errors)
  }
}

export default validate
