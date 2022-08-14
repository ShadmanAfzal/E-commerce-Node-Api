"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const updateUserScheme = joi_1.default.object({
    firstname: joi_1.default.string(),
    lastname: joi_1.default.string(),
    userProfile: joi_1.default.string().uri(),
    phone: joi_1.default.string().length(10).pattern(/^[0-9]+$/)
});
exports.default = updateUserScheme;
//# sourceMappingURL=updateUserValidator.js.map