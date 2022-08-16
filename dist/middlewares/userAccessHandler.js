"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthentication = void 0;
const __1 = require("..");
const userType_1 = __importDefault(require("../enum/userType"));
const userAuthentication = async (req, res, next) => {
    const user_id = req.user.id;
    const selectUserQuery = await __1.client.query(`SELECT * FROM users WHERE id='${user_id}';`);
    if (selectUserQuery.rows[0] == null) {
        return res.status(401).json({ success: false, message: `No user found with user id ${user_id}` });
    }
    if (selectUserQuery.rows[0].role === userType_1.default.user) {
        return res.status(401).json({ success: false, message: 'You are not register as seller' });
    }
    next();
};
exports.userAuthentication = userAuthentication;
//# sourceMappingURL=userAccessHandler.js.map