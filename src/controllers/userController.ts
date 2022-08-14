import { createUser, login, updateUserDetails, userDetails } from "../services/userServices.js";
import { Request,Response } from "express";
import loginScheme from "../utils/loginValidator.js";
import { userScheme,updateUserScheme } from "../utils/userValidator.js";

export async function registerUser(req:Request, res: Response){
    try {
        const result = userScheme.validate(req.body);

        if(result.error){
            return res.status(400).json({'success': false,'message': result.error.message});
        }

        res.json(await createUser(req.body));

    } catch (error) {
        res.status(400).json({'success': false, 'message': error.message});
    }
}

export async function loginUser(req:Request,res:Response){
    try {
        const result = loginScheme.validate(req.body);

        if(result.error){
            return res.status(400).json({'success': false,'message': result.error.message});
        }

        const loginStatus = await login(req.body);

        if(loginStatus.success){
            return res.json({"success": loginStatus.success, "token":loginStatus.token});
        }

        return res.status(401).json({"success": loginStatus.success, "message":loginStatus.message});

    } catch (error) {
        res.status(400).json({'success': false, 'message': error.message});
    }
}

export async function myDetails(req:Request,res:Response){
    try {
        const details = await userDetails(req.user.id);

        if(details==null)
            return res.json({'success': false, 'message': `details not found for user with id ${req.user.id}`})

        return res.json(details);

    } catch (error) {
        res.status(400).json({'success': false, 'message': error.message});
    }
}

export async function updateDetails(req:Request,res:Response){
    try {

        const validate = updateUserScheme.validate(req.body);

        if(validate.error){
            return res.status(400).json({'success': false,'message': validate.error.message});
        }

        return res.json(await updateUserDetails(req.user.id, req.body));

    } catch (error) {
        res.status(400).json({'success': false, 'message': error.message});
    }
}