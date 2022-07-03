import Joi from "joi";

export const Wallet = Joi.object({
    type: Joi.string()
        .required(),

    description: Joi.string()
        .required(),

    amount: Joi.number()
        .required(),

    date: Joi.string()
        .required(),

    time: Joi.string()
        .required(),

    userId: Joi.any()
        .required()
})