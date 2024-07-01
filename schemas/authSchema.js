import Joi from "joi";

import { emailRegexp } from "../constants/userConstants.js";

export const authRegisterSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

export const authSigninSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

export const authEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
});
