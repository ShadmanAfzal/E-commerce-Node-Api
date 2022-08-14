import { Request, Response } from "express";
import { sellerScheme } from "../utils/sellerValidator";
import { addDetails } from "../services/sellerServices";

export const addDetailsController = async (req: Request, res: Response) => {
    try {

        const validatorResult = sellerScheme.validate(req.body);

        if(validatorResult.error){
            return res.status(400).json({success: false, message: validatorResult.error.message});
        }

        return res.json(await addDetails(req.user,req.body));

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}