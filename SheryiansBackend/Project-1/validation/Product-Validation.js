const Joi = require("joi");

const productValidationSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  image: Joi.binary().required(),
  price: Joi.number().positive().required(),
  discount: Joi.number().optional(),
  bgcolor: Joi.string().optional(),
  panelcolor: Joi.string().optional(),
  textcolor: Joi.string().optional(),
});

module.exports = productValidationSchema;
