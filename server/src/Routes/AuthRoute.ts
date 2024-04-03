import express, { Router } from 'express';
import { login, register, logout, isLoggedIn, success } from "../Controller/AuthController"

export const authRouter: Router = express.Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/logout', logout);
authRouter.get('/isLoggedIn', isLoggedIn, success);