import express from "express";
import { getUserInformation, updateUserInformation } from "../Controller/UserController";
import { isLoggedIn } from "../Controller/AuthController";

export const profileRouter = express.Router();

profileRouter.get('/', isLoggedIn, getUserInformation);
profileRouter.patch('/', isLoggedIn, updateUserInformation);
