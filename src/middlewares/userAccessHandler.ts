import { NextFunction, Request, Response } from "express";
import { client } from "..";
import UserType from "../enum/userType";

export const userAuthentication = async (req: Request, res: Response, next: NextFunction) => {

    const user_id = req.user.id;

    const selectUserQuery = await client.query(`SELECT * FROM users WHERE id='${user_id}';`);

    if(selectUserQuery.rows[0] == null){
        return res.status(401).json({ success: false, message: `No user found with user id ${user_id}` });
    }

    if (selectUserQuery.rows[0].role === UserType.user) {
        return res.status(401).json({ success: false, message: 'You are not register as seller' });
    }

    next();
}