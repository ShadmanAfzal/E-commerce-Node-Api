"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDetailsController = void 0;
const sellerValidator_1 = require("../utils/sellerValidator");
const sellerServices_1 = require("../services/sellerServices");
const addDetailsController = async (req, res) => {
    try {
        const validatorResult = sellerValidator_1.sellerScheme.validate(req.body);
        if (validatorResult.error) {
            return res.status(400).json({ success: false, message: validatorResult.error.message });
        }
        return res.json(await (0, sellerServices_1.addDetails)(req.user, req.body));
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.addDetailsController = addDetailsController;
//# sourceMappingURL=sellerController.js.map