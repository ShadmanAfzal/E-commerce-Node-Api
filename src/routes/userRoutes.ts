import express from 'express';
import { loginUser, myDetails, registerUser, updateDetails } from '../controllers/userController.js';
import authenticationValidator from '../middlewares/authentication.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);

userRoutes.post('/login', loginUser);

userRoutes.get('/me', authenticationValidator, myDetails);

userRoutes.put('/me', authenticationValidator, updateDetails);

export default userRoutes;