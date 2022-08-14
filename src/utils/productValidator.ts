import Joi from "joi";

export const productScheme = Joi.object({
    title: Joi.string().required().messages({
        "string.base": "Title must be a string",
        "string.empty": "Please enter title for the product",
        "any.required": "Title is required",
    }),
    short_desc: Joi.string().max(100).required().messages({
        "string.base": "Description must be a string",
        "string.empty": "Please enter short description for the product",
        "any.required": "Short description is required for this product",
        "string.max": "Description must not be more than 100 character",
    }),
    description: Joi.string().required().messages({
        "string.base": "Description must be a string",
        "string.empty": "Please enter description for the product",
        "any.required": "Description is required for this product",
    }),
    image_url: Joi.string().uri().required().messages({
        "string.base": "Url must be in string format",
        "string.empty": "Please image url for the product",
        "any.required": "Image url is required for this product",
        "*": "Please provide valid url",
    }),
    tag: Joi.array().items(Joi.string()),
});

export const productUpdateScheme = Joi.object({
    id: Joi.string().required().messages({
        'string.base': 'id must be string',
        'string.empty': 'id is missing',
        'any.required': 'id is required',
    }),
    title: Joi.string().messages({ "string.base": "Title must be a string", }),
    short_desc: Joi.string().max(100).messages({
        "string.base": "Description must be a string",
        "string.max": "Description must not be more than 100 character",
    }),
    description: Joi.string().messages({
        "string.base": "Description must be a string",

    }),
    image_url: Joi.string().uri().messages({
        "string.base": "Url must be in string format",
        "*": "Please provide valid url",
    }),
    tag: Joi.array().items(Joi.string()),
});
