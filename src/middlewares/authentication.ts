import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { userDetails } from "../services/userServices";
import User from "../model/user";

function authenticationValidator(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        res.status(401).json({ 'success': false, 'message': 'bearer token missing' });
        return;
    }

    jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user: any) => {

        if (err) {
            return res.status(403).json({ 'success': false, 'message': 'forbidden' });
        }

        console.log(user)

        const response = await userDetails(user.id);

        console.log(response);

        req.user = response.data.user;

        next();
    });
}

export default authenticationValidator;