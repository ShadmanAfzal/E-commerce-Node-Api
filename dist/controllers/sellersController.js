"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDetailsController = void 0;
const sellerValidator_1 = require("../utils/sellerValidator");
const sellerServices_1 = require("../services/sellerServices");
const addDetailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatorResult = sellerValidator_1.sellerScheme.validate(req.body);
        if (validatorResult.error) {
            return res.status(400).json({ success: false, message: validatorResult.error.message });
        }
        return res.json(yield (0, sellerServices_1.addDetails)(req.body, req.user.id));
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.addDetailsController = addDetailsController;
//# sourceMappingURL=sellersController.js.map