import { Request,Response,NextFunction } from "express";

export const errorMiddleware = (err:any,req:Request,res:Response,next:NextFunction) => {

    const message = err.message || 'Internal Server Error';    
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({success: false, message: message});
}