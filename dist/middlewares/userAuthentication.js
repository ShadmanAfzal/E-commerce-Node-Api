"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthentication = void 0;
const userType_1 = __importDefault(require("../enum/userType"));
const queries_1 = __importDefault(require("../services/queries"));
const userAuthentication = async (req, res, next) => {
    const user_id = req.user.id;
    const selectUserQuery = await queries_1.default.query(`SELECT * FROM users WHERE id='${user_id}'`);
    if (selectUserQuery.rows[0].role === userType_1.default.user) {
        return res.status(401).json({ success: false, message: 'You are not register as seller' });
    }
    next();
};
exports.userAuthentication = userAuthentication;
//# sourceMappingURL=userAuthentication.js.map