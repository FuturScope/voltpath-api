import Joi from 'joi';

export const chargingStationValidator = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  location: Joi.string().required(),
  chargerType: Joi.string().required(),
  chargingSpeed: Joi.string().required(),
  powerOutput: Joi.string().required(),
  price: Joi.number().required()
});
