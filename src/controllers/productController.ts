import UserType from '../enum/userType.js';
import { NextFunction, Request, Response } from 'express';
import { addProduct, getProduct, getProductById, deleteProduct, myProducts, updateProduct, searchViaTag } from '../services/productServices.js'
import { productScheme, productUpdateScheme } from '../utils/productValidator.js';
import ErrorHandler from '../utils/error.js';

export const addProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = productScheme.validate(req.body);

        if (result.error) {
            return res.status(400).json({ 'success': false, 'message': result.error.message });
        }

        res.json(await addProduct(req.body, req.user));
    } catch (error) {
        return next(new ErrorHandler(error.statusCode, error.message));
    }
}

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json({ 'success': true, 'data': await getProduct() });
    } catch (error) {
        return next(new ErrorHandler(error.statusCode, error.message));
    }
}

export const getProductsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json(await getProductById(req.params.id));
    } catch (error) {
        return next(new ErrorHandler(error.statusCode, error.message));
    }
}

export const deleteProductsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json(await deleteProduct(req.params.id, req.user.id));
    } catch (error) {
        return next(new ErrorHandler(error.statusCode, error.message));
    }
}

export const getMyProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json(await myProducts(req.user.id));
    } catch (error) {
        return next(new ErrorHandler(error.statusCode, error.message));
    }
}

export const updateProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const validatedResult = productUpdateScheme.validate(req.body);

        if (validatedResult.error) {
            return next(new ErrorHandler(401, validatedResult.error.message));
        }

        const updateResult = await updateProduct(req.body, req.user.id);

        return res.json(updateResult);

    } catch (error) {
        return next(new ErrorHandler(error.statusCode, error.message));
    }
}

export const searchProductViaTag = async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!req.query.tag) {
            return res.json({ success: true, message: {} });
        }

        const tag = (req.query.tag as string).split(',').map(e => e.trim());

        return res.json(await searchViaTag(tag));
    } catch (error) {
        return next(new ErrorHandler(error.statusCode, error.message));
    }
}