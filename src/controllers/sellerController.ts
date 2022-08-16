import { NextFunction, Request, Response } from "express";
import { sellerScheme } from "../utils/sellerValidator";
import { addDetails } from "../services/sellerServices";
import ErrorHandler from "../utils/error";

export const addDetailsController = async (req: Request, res: Response,next:NextFunction) => {
    try {

        const validatorResult = sellerScheme.validate(req.body);

        if(validatorResult.error){
            return res.status(400).json({success: false, message: validatorResult.error.message});
        }

        return res.json(await addDetails(req.user,req.body));

    } catch (error) {
        return next(new ErrorHandler(500,error.message));
    }
}