import express, { Router } from 'express';
import signup from '../controllers/signup.js';
import login from '../controllers/login.js';

const userRoute = express.Router();

userRoute.post('/signup', signup);

userRoute.post('/login', login);

export default userRoute;