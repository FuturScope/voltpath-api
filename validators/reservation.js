import Joi from "joi";

export const createRegistrationValidator = Joi.object({
    reservationTime: Joi.string().required(),
    status: Joi.string().required().valid("reserved", "completed", "cancelled")
});

export const updateRegistrationValidator = Joi.object({
    reservationTime: Joi.string(),
    status: Joi.string()
});