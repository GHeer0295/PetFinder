import express, { Router } from 'express';
import { getPost, getUserPosts, createPost, deletePost} from '../Controller/PostController';
export const postRouter: Router = express.Router();

postRouter.get("/:postUUID", getPost)
postRouter.get("/user/:userUUID", getUserPosts)
postRouter.post("/create", createPost)
postRouter.delete("/delete", deletePost)