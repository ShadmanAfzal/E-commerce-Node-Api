"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDetails = void 0;
const userType_1 = __importDefault(require("../enum/userType"));
const __1 = require("..");
const addDetails = async (user, seller) => {
    const id = user.id;
    const insertQuery = `INSERT INTO seller_details values('${id}', '${seller.gstNumber}', '${seller.shopAddress}', '${seller.mailingAddress}' , '${seller.panNumber}', '${seller.aadhaarNumber}');`;
    await __1.client.query(insertQuery);
    if (user.role !== userType_1.default.seller) {
        const updateQuery = `UPDATE users SET role='${userType_1.default.seller}' where id='${id}';`;
        await __1.client.query(updateQuery);
    }
    return { success: true, message: "seller's details added successfully" };
};
exports.addDetails = addDetails;
//# sourceMappingURL=sellerServices.js.map