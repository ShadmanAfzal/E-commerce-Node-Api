import Joi from "joi";

const gst_regex = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
const pan_regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;

export const sellerScheme = Joi.object({
  gstNumber: Joi.string()
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

  mailingAddress: Joi.string().required().messages({
    "*": "Please enter your Mailing Address",
  }),

  shopAddress: Joi.string().required().messages({
    "*": "Please enter your Shop Address",
  }),

  panNumber: Joi.string().required().pattern(pan_regex).messages({
    "string.base": "PAN number should be string",
    "string.empty": "Please enter your PAN number",
    "any.required": "PAN Number is required",
    "*": "Please enter valid PAN Number",
  }),

  aadhaarNumber: Joi.string().required().length(12).messages({
    "string.base": "Aadhaar number should be string",
    "string.empty": "Please enter your Aadhaar number",
    "any.required": "Aadhaar Number is required",
    "*": "Please enter valid Aadhaar Number",
  }),
});
