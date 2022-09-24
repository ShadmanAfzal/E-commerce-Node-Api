import express from 'express';
import { getAvatar, loginUser, myDetails, registerUser, updateDetails, uploadAvatar } from '../controllers/userController.js';
import authenticationValidator from '../middlewares/authentication.js';
import {uploadAvatarHandler} from '../middlewares/uploadAvatarHandler';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);

userRoutes.post('/login', loginUser);

userRoutes.get('/me', authenticationValidator, myDetails);

userRoutes.put('/me', authenticationValidator, updateDetails);

userRoutes.post('/upload-avatar', authenticationValidator, uploadAvatarHandler.single('avatar'), uploadAvatar);

userRoutes.get('/:id/avatar', getAvatar);

export default userRoutes;