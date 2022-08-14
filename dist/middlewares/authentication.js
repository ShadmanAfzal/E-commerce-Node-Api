"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
        req.user = user;
        next();
    });
}
exports.default = authenticationValidator;
//# sourceMappingURL=authentication.js.map