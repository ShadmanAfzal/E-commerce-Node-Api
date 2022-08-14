import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import pool from "../services/queries";
import User from "../model/user";

function authenticationValidator(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        res.status(401).json({ 'success': false, 'message': 'bearer token missing' });
        return;
    }

    jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user:User) => {

        if (err) {
            return res.status(403).json({ 'success': false, 'message': 'forbidden' });
        }

        req.user = user;
        next();
    });
}

export default authenticationValidator;