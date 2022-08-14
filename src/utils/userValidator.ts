import Joi from "joi";
import UserType from "../enum/userType.js";

const password_regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const userScheme = Joi.object({
    firstname: Joi.string().required().messages({
        "string.base": "First name should be string",
        "string.empty": "First name missing",
        "any.required": "First name is required",
    }),
    lastname: Joi.string().required().messages({
        "string.base": "Last name should be string",
        "string.empty": "Last name missing",
        "any.required": "Last name is required",
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Email address is required",
        "*": "Enter valid email address",
    }),
    password: Joi.string().pattern(password_regex).required().messages({
        "string.base": "password must in string format",
        "string.empty": "password must not be empty",
        "any.required": "password is missing",
        "*": "password must be more than 8 characters long, should contain at least one upper case, one number and one special character",
    }),
    role: Joi.any().valid(UserType.seller, UserType.user),
    userProfile: Joi.string().uri().messages({
        "*": "Please enter valid url",
    }),
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required()
        .messages({
            "string.base": "Phone number should be string",
            "string.empty": "Phone number should not be empty",
            "any.required": "Phone number is required",
            "*": "Please enter valid phone number",
        }),
});

export const updateUserScheme = Joi.object({
    firstname: Joi.string().messages({
        "string.base": "First name should be string",
    }),

    lastname: Joi.string().messages({
        "string.base": "Last name should be string",
    }),

    userProfile: Joi.string().uri().messages({
        "*": "Please enter valid url",
    }),

    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .messages({
            "string.base": "Phone number should be string",
            "string.empty": "Please provide your phone number",
            "*": "Please enter valid phone number",
        }),
});
