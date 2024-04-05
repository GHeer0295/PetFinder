import express from "express";
import { getOtherUserInformation, getUserInformation, updateUserInformation } from "../Controller/UserController";
import { isLoggedIn } from "../Controller/AuthController";

export const profileRouter = express.Router();

profileRouter.get('/', isLoggedIn, getUserInformation);
profileRouter.get('/:username', isLoggedIn, getOtherUserInformation);

profileRouter.patch('/', isLoggedIn, updateUserInformation);
