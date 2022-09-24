import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";
import User from '../model/user';
import UserType from '../enum/userType';
import Seller from '../model/seller';
import { client } from '..';
import ErrorHandler from '../utils/error';
import sharp from 'sharp';

export async function createUser(user: User) {

    const encryptedPassword = await bcrypt.hash(user.password, 10);

    const isRegistered = (await client.query(`select * from users where email_id='${user.email}';`)).rowCount === 1;

    if (isRegistered) {
        throw new ErrorHandler(401, 'User Already Exists');
    }

    if (!user.role) {
        user.role = UserType.user;
    }

    const query = `insert into users (first_name, last_name, email_id, password, role, phone) values('${user.firstname}','${user.lastname}','${user.email}','${encryptedPassword}', '${user.role}', '${user.phone}');`;

    console.log(query);

    const result = await client.query(query);

    if (result.rowCount >= 1) {
        return { 'success': true, 'message': 'user created successfully' };
    }

    throw new ErrorHandler(500, 'Internal Server Error');
}

export async function login(user: User) {

    const email = user.email;

    const result = await client.query(`select * from users where email_id='${email}'`);

    if (result.rowCount === 0) {
        throw new ErrorHandler(404, 'User not found');
    }

    const password = result.rows[0].password;

    if (bcrypt.compareSync(user.password, password)) {

        const accessToken = jsonwebtoken.sign({ "id": result.rows[0].id }, process.env.ACCESS_TOKEN_SECRET);

        return { 'success': true, token: accessToken };
    }

    throw new ErrorHandler(401, 'Incorrect credentials');
}

export async function userDetails(id: string) {

    const searchUserDetails = await client.query(`select * from users where id='${id}';`);

    if (searchUserDetails.rowCount !== 1) {
        return { 'success': false, 'message': 'user details not found' };
    }

    delete searchUserDetails.rows[0].password;

    if (searchUserDetails.rows[0].role === UserType.user) {
        return { 'success': true, 'data': { 'user': searchUserDetails.rows[0] } };
    }

    const searchSellerDetails = await client.query(`select * from seller_details where id='${id}';`);

    let seller_details: Seller;

    if (searchSellerDetails.rowCount > 0) {
        seller_details = searchSellerDetails.rows[0];
        delete seller_details.id;
    }

    return { 'success': true, 'data': { 'user': searchUserDetails.rows[0], seller_details } };
}

export async function updateUserDetails(id: string, details: User) {

    const userDetail = await client.query(`select * from users where id='${id}'`);

    if (userDetail.rowCount === 0) {
        throw new ErrorHandler(404, 'User details not found');
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

    await client.query(`update users set first_name = '${updatedDetails.first_name}', last_name = '${updatedDetails.last_name}', user_profile = '${updatedDetails.user_profile}', phone= '${updatedDetails.phone}' where id='${id}';`)

    return { 'success': true, 'message': 'user details updated successfully' };
}

export const upload = async (avatarData: Buffer, id: string) => {

    const buffer = await sharp(avatarData).resize(250, 250).png().toBuffer()

    const insertQuery = `update users set avatar='${buffer.toString('base64')}' where id='${id}';`

    await client.query(insertQuery);

    return { success: true, message: 'avatar uploaded successfully' }
}

export const getAvatarData = async (id: string) => {

    if (!id) {
        throw new ErrorHandler(404, "User not found");
    }

    const insertQuery = `select avatar from users where id='${id}';`

    const result = await client.query(insertQuery);

    return result.rows[0].avatar;

}