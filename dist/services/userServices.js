"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserDetails = exports.userDetails = exports.login = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const queries_1 = __importDefault(require("./queries"));
const userType_1 = __importDefault(require("../enum/userType"));
async function createUser(user) {
    const encryptedPassword = await bcrypt_1.default.hash(user.password, 10);
    const isRegistered = (await queries_1.default.query(`select * from users where email_id='${user.email}';`)).rowCount === 1;
    if (isRegistered) {
        return { 'success': false, 'message': 'email address already registered' };
    }
    if (!user.userProfile) {
        user.userProfile = 'https://www.gravatar.com/avatar/';
    }
    if (!user.role) {
        user.role = userType_1.default.user;
    }
    const query = `insert into users (first_name, last_name, email_id, password, role, user_profile, phone) values('${user.firstname}','${user.lastname}','${user.email}','${encryptedPassword}', '${user.role}', '${user.userProfile}', '${user.phone}');`;
    console.log(query);
    const result = await queries_1.default.query(query);
    if (result.rowCount >= 1) {
        return { 'success': true, 'message': 'user created successfully' };
    }
    return { 'success': false, 'message': result };
}
exports.createUser = createUser;
async function login(user) {
    const email = user.email;
    const result = await queries_1.default.query(`select * from users where email_id='${email}'`);
    if (result.rowCount === 0) {
        return { 'success': false, 'message': 'user not found' };
    }
    const password = result.rows[0].password;
    if (bcrypt_1.default.compareSync(user.password, password)) {
        const fetchedUser = result.rows[0];
        delete fetchedUser.password;
        const accessToken = jsonwebtoken_1.default.sign(fetchedUser, process.env.ACCESS_TOKEN_SECRET);
        return { 'success': true, token: accessToken };
    }
    return { 'success': false, 'message': 'incorrect credentials' };
}
exports.login = login;
async function userDetails(id) {
    const searchUserDetails = await queries_1.default.query(`select * from users where id='${id}';`);
    if (searchUserDetails.rowCount !== 1) {
        return { 'success': false, 'message': 'user details not found' };
    }
    delete searchUserDetails.rows[0].password;
    if (searchUserDetails.rows[0].role === userType_1.default.user) {
        return { 'success': true, 'data': { 'user': searchUserDetails.rows[0] } };
    }
    const searchSellerDetails = await queries_1.default.query(`select * from seller_details where id='${id}';`);
    let seller_details;
    if (searchSellerDetails.rowCount > 0) {
        seller_details = searchSellerDetails.rows[0];
        delete seller_details.id;
    }
    return { 'success': true, 'data': { 'user': searchUserDetails.rows[0], seller_details } };
}
exports.userDetails = userDetails;
async function updateUserDetails(id, details) {
    const userDetail = await queries_1.default.query(`select * from users where id='${id}'`);
    if (userDetail.rowCount === 0) {
        return { 'success': false, 'message': 'user details not found' };
    }
    const updatedDetails = userDetail.rows[0];
    if (details.firstname) {
        updatedDetails.first_name = details.firstname;
    }
    if (details.lastname) {
        updatedDetails.last_name = details.lastname;
    }
    if (details.userProfile) {
        updatedDetails.user_profile = details.userProfile;
    }
    if (details.phone) {
        updatedDetails.phone = details.phone;
    }
    await queries_1.default.query(`update users set first_name = '${updatedDetails.first_name}', last_name = '${updatedDetails.last_name}', user_profile = '${updatedDetails.user_profile}', phone= '${updatedDetails.phone}' where id='${id}';`);
    return { 'success': true, 'message': 'user details updated successfully' };
}
exports.updateUserDetails = updateUserDetails;
//# sourceMappingURL=userServices.js.map