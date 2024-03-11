import express, { Router } from 'express';
import { login, register, logout } from "../Controller/AuthController"

export const authRouter: Router = express.Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.get('/logout', logout);