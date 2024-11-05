import Joi from "joi";

export const createRegistrationValidator = Joi.object({
    reservationTime: Joi.string().required(),
    reservationDate: Joi.date().required(),
    price: Joi.number().required(),
});

export const updateRegistrationValidator = Joi.object({
    reservationTime: Joi.string(),
    reservationDate: Joi.date(),
    price: Joi.number(),
});