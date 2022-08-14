"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductViaTag = exports.updateProducts = exports.getMyProducts = exports.deleteProductsById = exports.getProductsById = exports.getProducts = exports.addProducts = void 0;
const productServices_js_1 = require("../services/productServices.js");
const productValidator_js_1 = require("../utils/productValidator.js");
const addProducts = async (req, res) => {
    try {
        const result = productValidator_js_1.productScheme.validate(req.body);
        if (result.error) {
            return res.status(400).json({ 'success': false, 'message': result.error.message });
        }
        res.json(await (0, productServices_js_1.addProduct)(req.body, req.user));
    }
    catch (error) {
        res.status(400).json({ 'error': error.message });
    }
};
exports.addProducts = addProducts;
const getProducts = async (req, res) => {
    try {
        res.json({ 'success': true, 'data': await (0, productServices_js_1.getProduct)() });
    }
    catch (error) {
        res.status(400).json({ 'success': false, 'message': error.message });
    }
};
exports.getProducts = getProducts;
const getProductsById = async (req, res) => {
    try {
        return res.json(await (0, productServices_js_1.getProductById)(req.params.id));
    }
    catch (error) {
        res.status(400).json({ 'success': false, 'message': error.message });
    }
};
exports.getProductsById = getProductsById;
const deleteProductsById = async (req, res) => {
    try {
        return res.json(await (0, productServices_js_1.deleteProduct)(req.params.id, req.user.id));
    }
    catch (error) {
        res.status(400).json({ 'success': false, 'message': error.message });
    }
};
exports.deleteProductsById = deleteProductsById;
const getMyProducts = async (req, res) => {
    try {
        return res.json(await (0, productServices_js_1.myProducts)(req.user.id));
    }
    catch (error) {
        res.status(400).json({ 'success': false, 'message': error.message });
    }
};
exports.getMyProducts = getMyProducts;
const updateProducts = async (req, res) => {
    try {
        const validatedResult = productValidator_js_1.productUpdateScheme.validate(req.body);
        if (validatedResult.error) {
            return res.status(400).json({ 'success': false, 'message': validatedResult.error.message });
        }
        const updateResult = await (0, productServices_js_1.updateProduct)(req.body, req.user.id);
        return res.json(updateResult);
    }
    catch (error) {
        return res.status(400).json({ 'success': false, message: error.message });
    }
};
exports.updateProducts = updateProducts;
const searchProductViaTag = async (req, res) => {
    try {
        console.log(req.query);
        if (!req.query.tag) {
            return res.json({ success: true, message: {} });
        }
        const tag = req.query.tag.split(',').map(e => e.trim());
        return res.json(await (0, productServices_js_1.searchViaTag)(tag));
    }
    catch (error) {
        return res.status(400).json({ 'success': false, message: error.message });
    }
};
exports.searchProductViaTag = searchProductViaTag;
//# sourceMappingURL=productController.js.map