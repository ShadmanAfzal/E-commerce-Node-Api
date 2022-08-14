import { NextFunction, Request, Response } from "express";
import UserType from "../enum/userType";
import pool from "../services/queries";

export const userAuthentication = async (req: Request, res: Response, next: NextFunction) => {

    const user_id = req.user.id;

    const selectUserQuery = await pool.query(`SELECT * FROM users WHERE id='${user_id}'`);

    if (selectUserQuery.rows[0].role === UserType.user) {
        return res.status(401).json({ success: false, message: 'You are not register as seller' });
    }

    next();
}