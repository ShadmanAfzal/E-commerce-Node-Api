import User from "../model/user";
import UserType from "../enum/userType";
import Seller from "../model/seller";
import { client } from "..";

export const addDetails = async (user: User, seller: Seller) => {

    const id = user.id;

    const insertQuery = `INSERT INTO seller_details values('${id}', '${seller.gstNumber}', '${seller.shopAddress}', '${seller.mailingAddress}' , '${seller.panNumber}', '${seller.aadhaarNumber}');`

    await client.query(insertQuery);

    if (user.role !== UserType.seller) {
        const updateQuery = `UPDATE users SET role='${UserType.seller}' where id='${id}';`;
        await client.query(updateQuery);
    }

    return { success: true, message: "seller's details added successfully" };
}