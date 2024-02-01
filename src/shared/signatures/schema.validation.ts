import * as Joi from "joi";

const schemaValidation = Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test', 'local', 'provision')
      .default('development'),
    PORT: Joi.number().default(3000),
  });

export default schemaValidation;