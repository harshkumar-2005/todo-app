import express, { Router } from 'express';
import signup from '../controllers/signup.js';
import login from '../controllers/login.js';
import logout from '../controllers/logout.js'

const userRoute = express.Router();

userRoute.post('/signup', signup);

userRoute.post('/login', login);

userRoute.post('/logout', logout);

export default userRoute;