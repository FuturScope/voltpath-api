import Joi from "joi";

export const createRegistrationValidator = Joi.object({
    name: Joi.string().required(),
    reservationTime: Joi.string().required(),
    reservationDate: Joi.date().required(),
    chargerType: Joi.string().required(),
    location: Joi.string().required()
});

export const updateRegistrationValidator = Joi.object({
    name: Joi.string(),
    reservationTime: Joi.string(),
    reservationDate: Joi.date(),
    chargerType: Joi.string(),
    location: Joi.string()
});