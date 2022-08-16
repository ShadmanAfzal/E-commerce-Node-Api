"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDetailsController = void 0;
const sellerValidator_1 = require("../utils/sellerValidator");
const sellerServices_1 = require("../services/sellerServices");
const error_1 = __importDefault(require("../utils/error"));
const addDetailsController = async (req, res, next) => {
    try {
        const validatorResult = sellerValidator_1.sellerScheme.validate(req.body);
        if (validatorResult.error) {
            return res.status(400).json({ success: false, message: validatorResult.error.message });
        }
        return res.json(await (0, sellerServices_1.addDetails)(req.user, req.body));
    }
    catch (error) {
        return next(new error_1.default(500, error.message));
    }
};
exports.addDetailsController = addDetailsController;
//# sourceMappingURL=sellerController.js.map