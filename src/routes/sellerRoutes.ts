import express from "express";
import authenticationValidator from "../middlewares/authentication";
import { addDetailsController } from "../controllers/sellerController";

const sellerRouter = express.Router();

sellerRouter.post('/register', authenticationValidator, addDetailsController);

export default sellerRouter;