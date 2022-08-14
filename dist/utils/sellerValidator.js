"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerScheme = void 0;
const joi_1 = __importDefault(require("joi"));
const gst_regex = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
const pan_regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
exports.sellerScheme = joi_1.default.object({
    gstNumber: joi_1.default.string()
        .alphanum()
        .length(15)
        .pattern(gst_regex)
        .required()
        .messages({
        "string.base": "GST number should be string",
        "string.empty": "Please enter your GST number",
        "any.required": "GST Number is required",
        "*": "Please enter valid GST Number",
    }),
    mailingAddress: joi_1.default.string().required().messages({
        "*": "Please enter your Mailing Address",
    }),
    shopAddress: joi_1.default.string().required().messages({
        "*": "Please enter your Shop Address",
    }),
    panNumber: joi_1.default.string().required().pattern(pan_regex).messages({
        "string.base": "PAN number should be string",
        "string.empty": "Please enter your PAN number",
        "any.required": "PAN Number is required",
        "*": "Please enter valid PAN Number",
    }),
    aadhaarNumber: joi_1.default.string().required().length(12).messages({
        "string.base": "Aadhaar number should be string",
        "string.empty": "Please enter your Aadhaar number",
        "any.required": "Aadhaar Number is required",
        "*": "Please enter valid Aadhaar Number",
    }),
});
//# sourceMappingURL=sellerValidator.js.map