"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDetails = void 0;
const userType_1 = __importDefault(require("../enum/userType"));
const queries_1 = __importDefault(require("./queries"));
const addDetails = async (user, seller) => {
    const id = user.id;
    const insertQuery = `INSERT INTO seller_details values('${id}', '${seller.gstNumber}', '${seller.shopAddress}', '${seller.mailingAddress}' , '${seller.panNumber}', '${seller.aadhaarNumber}');`;
    await queries_1.default.query(insertQuery);
    if (user.role !== userType_1.default.seller) {
        const updateQuery = `UPDATE users SET role='${userType_1.default.seller}' where id='${id}';`;
        await queries_1.default.query(updateQuery);
    }
    return { success: true, message: "seller's details added successfully" };
};
exports.addDetails = addDetails;
//# sourceMappingURL=sellerServices.js.map