"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAccessHandler_js_1 = require("../middlewares/userAccessHandler.js");
const productController_js_1 = require("../controllers/productController.js");
const authentication_js_1 = __importDefault(require("../middlewares/authentication.js"));
const productsRouter = express_1.default.Router();
productsRouter.get('/search', productController_js_1.searchProductViaTag);
productsRouter.get('/', productController_js_1.getProducts);
productsRouter.get('/me', authentication_js_1.default, userAccessHandler_js_1.userAuthentication, productController_js_1.getMyProducts);
productsRouter.get('/:id', productController_js_1.getProductsById);
productsRouter.delete('/:id', authentication_js_1.default, userAccessHandler_js_1.userAuthentication, productController_js_1.deleteProductsById);
productsRouter.post('/', authentication_js_1.default, userAccessHandler_js_1.userAuthentication, productController_js_1.addProducts);
productsRouter.put('/', authentication_js_1.default, userAccessHandler_js_1.userAuthentication, productController_js_1.updateProducts);
exports.default = productsRouter;
//# sourceMappingURL=productsRoutes.js.map