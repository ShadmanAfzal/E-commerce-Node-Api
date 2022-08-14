"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const sellerController_1 = require("../controllers/sellerController");
const sellerRouter = express_1.default.Router();
sellerRouter.post('/register', authentication_1.default, sellerController_1.addDetailsController);
exports.default = sellerRouter;
//# sourceMappingURL=sellerRoutes.js.map