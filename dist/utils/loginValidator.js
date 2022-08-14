"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const password_regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const loginScheme = joi_1.default.object({
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
});
exports.default = loginScheme;
//# sourceMappingURL=loginValidator.js.map