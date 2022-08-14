"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProducts = exports.getMyProducts = exports.deleteProductsById = exports.getProductsById = exports.getProducts = exports.addProducts = void 0;
const userType_js_1 = __importDefault(require("../enum/userType.js"));
const productServices_js_1 = require("../services/productServices.js");
const productValidator_js_1 = require("../utils/productValidator.js");
const addProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = productValidator_js_1.productScheme.validate(req.body);
        if (result.error) {
            return res.status(400).json({ 'success': false, 'message': result.error.message });
        }
        res.json(yield (0, productServices_js_1.addProduct)(req.body, req.user));
    }
    catch (error) {
        res.status(400).json({ 'error': error });
    }
});
exports.addProducts = addProducts;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ 'success': true, 'data': yield (0, productServices_js_1.getProduct)() });
    }
    catch (error) {
        res.status(400).json({ 'success': false, 'message': error });
    }
});
exports.getProducts = getProducts;
const getProductsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!isNaN(req.params.id)) {
            return res.json(yield (0, productServices_js_1.getProductById)(req.params.id));
        }
        return res.status(400).json({ 'error': 'invalid product id' });
    }
    catch (error) {
        res.status(400).json({ 'success': false, 'message': error });
    }
});
exports.getProductsById = getProductsById;
const deleteProductsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!isNaN(req.params.id)) {
            return res.json(yield (0, productServices_js_1.deleteProduct)(req.params.id));
        }
        return res.status(400).json({ 'error': 'invalid product id' });
    }
    catch (error) {
        res.status(400).json({ 'success': false, 'message': error });
    }
});
exports.deleteProductsById = deleteProductsById;
const getMyProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json(yield (0, productServices_js_1.myProducts)(req.user.id));
    }
    catch (error) {
        res.status(400).json({ 'success': false, 'message': error.message });
    }
});
exports.getMyProducts = getMyProducts;
const updateProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedResult = productValidator_js_1.productUpdateScheme.validate(req.body);
        if (validatedResult.error) {
            return res.status(400).json({ 'success': false, 'message': validatedResult.error.message });
        }
        if (req.user.role === userType_js_1.default.user) {
            return res.status(401).json({ 'success': false, 'message': `You are not registered as Seller` });
        }
        const updateResult = yield (0, productServices_js_1.updateProduct)(req.body, req.user.id);
        return res.json(updateResult);
    }
    catch (error) {
        return res.status(400).json({ 'success': false, message: error.message });
    }
});
exports.updateProducts = updateProducts;
//# sourceMappingURL=productsController.js.map