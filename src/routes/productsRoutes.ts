import express from "express";
import { userAuthentication } from "../middlewares/userAuthentication.js";
import { getMyProducts, addProducts, getProducts, getProductsById, deleteProductsById, updateProducts, searchProductViaTag } from "../controllers/productController.js";
import authenticationValidator from "../middlewares/authentication.js";

const productsRouter = express.Router();

productsRouter.get('/search', searchProductViaTag);

productsRouter.get('/', getProducts);

productsRouter.get('/me', authenticationValidator, userAuthentication, getMyProducts);

productsRouter.get('/:id', getProductsById);

productsRouter.delete('/:id', authenticationValidator, userAuthentication, deleteProductsById);

productsRouter.post('/', authenticationValidator, userAuthentication, addProducts);

productsRouter.put('/', authenticationValidator, userAuthentication, updateProducts);


export default productsRouter;