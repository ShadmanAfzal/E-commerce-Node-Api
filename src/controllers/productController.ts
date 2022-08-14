import UserType from '../enum/userType.js';
import { Request, Response } from 'express';
import { addProduct, getProduct, getProductById, deleteProduct, myProducts, updateProduct, searchViaTag } from '../services/productServices.js'
import { productScheme, productUpdateScheme } from '../utils/productValidator.js';

export const addProducts = async (req: Request, res: Response) => {
    try {
        const result = productScheme.validate(req.body);

        if (result.error) {
            return res.status(400).json({ 'success': false, 'message': result.error.message });
        }

        res.json(await addProduct(req.body, req.user));
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        res.json({ 'success': true, 'data': await getProduct() });
    } catch (error) {
        res.status(400).json({ 'success': false, 'message': error.message })
    }
}

export const getProductsById = async (req: Request, res: Response) => {
    try {
        return res.json(await getProductById(req.params.id));
    } catch (error) {
        res.status(400).json({ 'success': false, 'message': error.message })
    }
}

export const deleteProductsById = async (req: Request, res: Response) => {
    try {
        return res.json(await deleteProduct(req.params.id,req.user.id));
    } catch (error) {
        res.status(400).json({ 'success': false, 'message': error.message })
    }
}

export const getMyProducts = async (req: Request, res: Response) => {
    try {
        return res.json(await myProducts(req.user.id));
    } catch (error) {
        res.status(400).json({ 'success': false, 'message': error.message })
    }
}

export const updateProducts = async (req: Request, res: Response) => {
    try {

        const validatedResult = productUpdateScheme.validate(req.body);


        if (validatedResult.error) {
            return res.status(400).json({ 'success': false, 'message': validatedResult.error.message });
        }

        const updateResult = await updateProduct(req.body, req.user.id);

        return res.json(updateResult);

    } catch (error) {
        return res.status(400).json({ 'success': false, message: error.message })
    }
}

export const searchProductViaTag = async (req: Request, res: Response) => {
    try {

        console.log(req.query);

        if(!req.query.tag){
            return res.json({success: true, message: {}});
        }

        const tag = (req.query.tag as string).split(',').map(e => e.trim());

        return res.json(await searchViaTag(tag));
    } catch (error) {
        return res.status(400).json({ 'success': false, message: error.message })
    }
}