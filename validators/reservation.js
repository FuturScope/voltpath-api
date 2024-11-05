import Joi from "joi";

export const createRegistrationValidator = Joi.object({
    reservationTime: Joi.string().required(),
    price: Joi.number().required(),
    isAvailalble: Joi.boolean().default("true")
});

export const updateRegistrationValidator = Joi.object({
    reservationTime: Joi.string(),
    price: Joi.number(),
    isAvailalble: Joi.boolean()
});