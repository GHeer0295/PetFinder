import express from "express";
import { getUserInformation } from "../Controller/UserController";
import { isLoggedIn } from "../Controller/AuthController";

export const searchRouter = express.Router();

searchRouter.get('/', isLoggedIn, getUserInformation);
