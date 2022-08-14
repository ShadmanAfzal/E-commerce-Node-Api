"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserScheme = exports.userScheme = void 0;
const joi_1 = __importDefault(require("joi"));
const userType_js_1 = __importDefault(require("../enum/userType.js"));
const password_regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
exports.userScheme = joi_1.default.object({
    firstname: joi_1.default.string().required().messages({
        "string.base": "First name should be string",
        "string.empty": "First name missing",
        "any.required": "First name is required",
    }),
    lastname: joi_1.default.string().required().messages({
        "string.base": "Last name should be string",
        "string.empty": "Last name missing",
        "any.required": "Last name is required",
    }),
    email: joi_1.default.string().email().required().messages({
        "any.required": "Email address is required",
        "*": "Enter valid email address",
    }),
    password: joi_1.default.string().pattern(password_regex).required().messages({
        "string.base": "password must in string format",
        "string.empty": "password must not be empty",
        "any.required": "password is missing",
        "*": "password must be more than 8 characters long, should contain at least one upper case, one number and one special character",
    }),
    role: joi_1.default.any().valid(userType_js_1.default.seller, userType_js_1.default.user),
    userProfile: joi_1.default.string().uri().messages({
        "*": "Please enter valid url",
    }),
    phone: joi_1.default.string()
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
exports.updateUserScheme = joi_1.default.object({
    firstname: joi_1.default.string().messages({
        "string.base": "First name should be string",
    }),
    lastname: joi_1.default.string().messages({
        "string.base": "Last name should be string",
    }),
    userProfile: joi_1.default.string().uri().messages({
        "*": "Please enter valid url",
    }),
    phone: joi_1.default.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .messages({
        "string.base": "Phone number should be string",
        "string.empty": "Please provide your phone number",
        "*": "Please enter valid phone number",
    }),
});
//# sourceMappingURL=userValidator.js.map