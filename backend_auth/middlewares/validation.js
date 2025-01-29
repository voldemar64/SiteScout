import { Joi, celebrate } from 'celebrate';

const phoneExpression = /^\+7\d{10}$/;

// Общие схемы для повторного использования
const emailSchema = Joi.string().required().email();
const phoneSchema = Joi.string().pattern(phoneExpression).required();
const nameSchema = Joi.string().min(2).max(30).required();
const surnameSchema = Joi.string().min(2).max(30).required();

const signinValidation = celebrate({
    body: Joi.object().keys({
        email: emailSchema,
        password: Joi.string().required(),
    }),
});

const signupValidation = celebrate({
    body: Joi.object().keys({
        name: nameSchema,
        surname: surnameSchema,
        phone: phoneSchema,
        email: emailSchema,
        password: Joi.string().required(),
    }),
});

const currentUserValidation = celebrate({
    params: Joi.object().keys({
        id: Joi.string().required().hex().length(24),
    }),
});

const userValidation = celebrate({
    body: Joi.object().keys({
        name: nameSchema,
        surname: surnameSchema,
        phone: phoneSchema,
        email: emailSchema,
    }),
});

export default {
    signinValidation,
    signupValidation,
    currentUserValidation,
    userValidation,
};
