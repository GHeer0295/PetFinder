import express from "express";
import { getInterests, LikePost } from "../Controller/InterestsController";

export const interestsRouter = express.Router();

interestsRouter.get('/', getInterests);
interestsRouter.post('/like', LikePost);