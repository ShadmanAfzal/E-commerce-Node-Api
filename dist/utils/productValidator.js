"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productUpdateScheme = exports.productScheme = void 0;
const joi_1 = __importDefault(require("joi"));
exports.productScheme = joi_1.default.object({
    title: joi_1.default.string().required().messages({
        "string.base": "Title must be a string",
        "string.empty": "Please enter title for the product",
        "any.required": "Title is required",
    }),
    short_desc: joi_1.default.string().max(100).required().messages({
        "string.base": "Description must be a string",
        "string.empty": "Please enter short description for the product",
        "any.required": "Short description is required for this product",
        "string.max": "Description must not be more than 100 character",
    }),
    description: joi_1.default.string().required().messages({
        "string.base": "Description must be a string",
        "string.empty": "Please enter description for the product",
        "any.required": "Description is required for this product",
    }),
    image_url: joi_1.default.string().uri().required().messages({
        "string.base": "Url must be in string format",
        "string.empty": "Please image url for the product",
        "any.required": "Image url is required for this product",
        "*": "Please provide valid url",
    }),
    tag: joi_1.default.array().items(joi_1.default.string()),
});
exports.productUpdateScheme = joi_1.default.object({
    id: joi_1.default.string().required().messages({
        'string.base': 'id must be string',
        'string.empty': 'id is missing',
        'any.required': 'id is required',
    }),
    title: joi_1.default.string().messages({ "string.base": "Title must be a string", }),
    short_desc: joi_1.default.string().max(100).messages({
        "string.base": "Description must be a string",
        "string.max": "Description must not be more than 100 character",
    }),
    description: joi_1.default.string().messages({
        "string.base": "Description must be a string",
    }),
    image_url: joi_1.default.string().uri().messages({
        "string.base": "Url must be in string format",
        "*": "Please provide valid url",
    }),
    tag: joi_1.default.array().items(joi_1.default.string()),
});
//# sourceMappingURL=productValidator.js.map