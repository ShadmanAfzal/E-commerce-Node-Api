import Joi from "joi";

const password_regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const loginScheme = Joi.object({
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
});

export default loginScheme;