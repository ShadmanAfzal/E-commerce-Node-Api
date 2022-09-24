import { createUser, getAvatarData, login, updateUserDetails, upload, userDetails } from "../services/userServices.js";
import { NextFunction, Request, response, Response } from "express";
import loginScheme from "../utils/loginValidator.js";
import { userScheme, updateUserScheme } from "../utils/userValidator.js";
import ErrorHandler from "../utils/error.js";
import { request } from "http";

export async function registerUser(req: Request, res: Response, next: NextFunction) {
    try {
        const result = userScheme.validate(req.body);

        if (result.error) {
            return res.status(400).json({ 'success': false, 'message': result.error.message });
        }

        res.json(await createUser(req.body));

    } catch (error) {
        return next(new ErrorHandler(error.statusCode, error.message));
    }
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
    try {
        const result = loginScheme.validate(req.body);

        if (result.error) {
            return res.status(400).json({ 'success': false, 'message': result.error.message });
        }

        const loginStatus = await login(req.body);

        return res.json({ "success": loginStatus.success, "token": loginStatus.token });

    } catch (error) {
        return next(new ErrorHandler(error.statusCode, error.message));
    }
}

export async function myDetails(req: Request, res: Response, next: NextFunction) {
    try {
        const details = await userDetails(req.user.id);

        if (details == null)
            return res.json({ 'success': false, 'message': `details not found for user with id ${req.user.id}` })

        return res.json(details);

    } catch (error) {
        return next(new ErrorHandler(error.statusCode, error.message));
    }
}

export async function updateDetails(req: Request, res: Response, next: NextFunction) {
    try {

        const validate = updateUserScheme.validate(req.body);

        if (validate.error) {
            return res.status(400).json({ 'success': false, 'message': validate.error.message });
        }

        return res.json(await updateUserDetails(req.user.id, req.body));

    } catch (error) {
        return next(new ErrorHandler(error.statusCode, error.message));
    }
}

export async function uploadAvatar(req: Request, res: Response, next: NextFunction) {
    try {
        return res.json(await upload(req.file.buffer, req.user.id));
    } catch (error) {
        return next(new ErrorHandler(error.statusCode, error.message));
    }
}

export const getAvatar = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const avatar: string = await getAvatarData(req.params.id);
        res.setHeader('content-type', 'image/png');
        res.send(Buffer.from(avatar, 'base64'));

    } catch (error) {
        return next(new ErrorHandler(error.statusCode, error.message));
    }

}