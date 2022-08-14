"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_js_1 = require("../controllers/userController.js");
const authentication_js_1 = __importDefault(require("../middlewares/authentication.js"));
const userRoutes = express_1.default.Router();
userRoutes.post('/register', userController_js_1.registerUser);
userRoutes.post('/login', userController_js_1.loginUser);
userRoutes.get('/me', authentication_js_1.default, userController_js_1.myDetails);
userRoutes.put('/me', authentication_js_1.default, userController_js_1.updateDetails);
exports.default = userRoutes;
//# sourceMappingURL=userRoutes.js.map