import express, { Router } from 'express';
import signup from '../controllers/signup.js';
import login from '../controllers/login.js';
import { createToken } from '../middleware/authMiddleware.js';

const userRoute = express.Router();

userRoute.post('/signup', signup);

userRoute.post('/login', createToken, login);

export default userRoute;