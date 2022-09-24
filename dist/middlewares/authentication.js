"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userServices_1 = require("../services/userServices");
function authenticationValidator(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.status(401).json({ 'success': false, 'message': 'bearer token missing' });
        return;
    }
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            return res.status(403).json({ 'success': false, 'message': 'forbidden' });
        }
        console.log(user);
        const response = await (0, userServices_1.userDetails)(user.id);
        console.log(response);
        req.user = response.data.user;
        next();
    });
}
exports.default = authenticationValidator;
//# sourceMappingURL=authentication.js.map