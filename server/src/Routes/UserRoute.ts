import express from "express";
import { getOtherUserInformation, getUserInformation, updateUserInformation } from "../Controller/UserController";
import { isLoggedIn } from "../Controller/AuthController";

export const userRouter = express.Router();

userRouter.get('/', isLoggedIn, getUserInformation);
userRouter.get('/:username', isLoggedIn, getOtherUserInformation);

userRouter.patch('/', isLoggedIn, updateUserInformation);
