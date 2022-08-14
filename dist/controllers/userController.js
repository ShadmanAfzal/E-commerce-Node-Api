"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDetails = exports.myDetails = exports.loginUser = exports.registerUser = void 0;
const userServices_js_1 = require("../services/userServices.js");
const loginValidator_js_1 = __importDefault(require("../utils/loginValidator.js"));
const userValidator_js_1 = require("../utils/userValidator.js");
async function registerUser(req, res) {
    try {
        const result = userValidator_js_1.userScheme.validate(req.body);
        if (result.error) {
            return res.status(400).json({ 'success': false, 'message': result.error.message });
        }
        res.json(await (0, userServices_js_1.createUser)(req.body));
    }
    catch (error) {
        res.status(400).json({ 'success': false, 'message': error.message });
    }
}
exports.registerUser = registerUser;
async function loginUser(req, res) {
    try {
        const result = loginValidator_js_1.default.validate(req.body);
        if (result.error) {
            return res.status(400).json({ 'success': false, 'message': result.error.message });
        }
        const loginStatus = await (0, userServices_js_1.login)(req.body);
        if (loginStatus.success) {
            return res.json({ "success": loginStatus.success, "token": loginStatus.token });
        }
        return res.status(401).json({ "success": loginStatus.success, "message": loginStatus.message });
    }
    catch (error) {
        res.status(400).json({ 'success': false, 'message': error.message });
    }
}
exports.loginUser = loginUser;
async function myDetails(req, res) {
    try {
        const details = await (0, userServices_js_1.userDetails)(req.user.id);
        if (details == null)
            return res.json({ 'success': false, 'message': `details not found for user with id ${req.user.id}` });
        return res.json(details);
    }
    catch (error) {
        res.status(400).json({ 'success': false, 'message': error.message });
    }
}
exports.myDetails = myDetails;
async function updateDetails(req, res) {
    try {
        const validate = userValidator_js_1.updateUserScheme.validate(req.body);
        if (validate.error) {
            return res.status(400).json({ 'success': false, 'message': validate.error.message });
        }
        return res.json(await (0, userServices_js_1.updateUserDetails)(req.user.id, req.body));
    }
    catch (error) {
        res.status(400).json({ 'success': false, 'message': error.message });
    }
}
exports.updateDetails = updateDetails;
//# sourceMappingURL=userController.js.map