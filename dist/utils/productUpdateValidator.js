"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const productUpdateScheme = joi_1.default.object({
    id: joi_1.default.number().required(),
    title: joi_1.default.string(),
    short_desc: joi_1.default.string().max(100),
    description: joi_1.default.string(),
    photo_url: joi_1.default.string().uri(),
    tag: joi_1.default.array().items(joi_1.default.string()),
});
exports.default = productUpdateScheme;
//# sourceMappingURL=productUpdateValidator.js.map