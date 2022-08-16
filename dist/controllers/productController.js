"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductViaTag = exports.updateProducts = exports.getMyProducts = exports.deleteProductsById = exports.getProductsById = exports.getProducts = exports.addProducts = void 0;
const productServices_js_1 = require("../services/productServices.js");
const productValidator_js_1 = require("../utils/productValidator.js");
const error_js_1 = __importDefault(require("../utils/error.js"));
const addProducts = async (req, res, next) => {
    try {
        const result = productValidator_js_1.productScheme.validate(req.body);
        if (result.error) {
            return res.status(400).json({ 'success': false, 'message': result.error.message });
        }
        res.json(await (0, productServices_js_1.addProduct)(req.body, req.user));
    }
    catch (error) {
        return next(new error_js_1.default(error.statusCode, error.message));
    }
};
exports.addProducts = addProducts;
const getProducts = async (req, res, next) => {
    try {
        res.json({ 'success': true, 'data': await (0, productServices_js_1.getProduct)() });
    }
    catch (error) {
        return next(new error_js_1.default(error.statusCode, error.message));
    }
};
exports.getProducts = getProducts;
const getProductsById = async (req, res, next) => {
    try {
        return res.json(await (0, productServices_js_1.getProductById)(req.params.id));
    }
    catch (error) {
        return next(new error_js_1.default(error.statusCode, error.message));
    }
};
exports.getProductsById = getProductsById;
const deleteProductsById = async (req, res, next) => {
    try {
        return res.json(await (0, productServices_js_1.deleteProduct)(req.params.id, req.user.id));
    }
    catch (error) {
        return next(new error_js_1.default(error.statusCode, error.message));
    }
};
exports.deleteProductsById = deleteProductsById;
const getMyProducts = async (req, res, next) => {
    try {
        return res.json(await (0, productServices_js_1.myProducts)(req.user.id));
    }
    catch (error) {
        return next(new error_js_1.default(error.statusCode, error.message));
    }
};
exports.getMyProducts = getMyProducts;
const updateProducts = async (req, res, next) => {
    try {
        const validatedResult = productValidator_js_1.productUpdateScheme.validate(req.body);
        if (validatedResult.error) {
            return next(new error_js_1.default(401, validatedResult.error.message));
        }
        const updateResult = await (0, productServices_js_1.updateProduct)(req.body, req.user.id);
        return res.json(updateResult);
    }
    catch (error) {
        return next(new error_js_1.default(error.statusCode, error.message));
    }
};
exports.updateProducts = updateProducts;
const searchProductViaTag = async (req, res, next) => {
    try {
        if (!req.query.tag) {
            return res.json({ success: true, message: {} });
        }
        const tag = req.query.tag.split(',').map(e => e.trim());
        return res.json(await (0, productServices_js_1.searchViaTag)(tag));
    }
    catch (error) {
        return next(new error_js_1.default(error.statusCode, error.message));
    }
};
exports.searchProductViaTag = searchProductViaTag;
//# sourceMappingURL=productController.js.map