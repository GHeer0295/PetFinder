import express from "express";
import { getUserInformation } from "../Controller/ProfileController";
import { isLoggedIn } from "../Controller/AuthController";

export const profileRouter = express.Router();

profileRouter.get('/', isLoggedIn, getUserInformation);
