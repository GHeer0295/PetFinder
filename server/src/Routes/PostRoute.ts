import express, { Router } from 'express';
import { getUserPosts, createPost, deletePost, addImage, getPetImage, getUserFromPost} from '../Controller/PostController';
import bodyParser from "body-parser"

export const postRouter: Router = express.Router();

postRouter.get("/user/:userUUID", getUserPosts)
postRouter.post("/create", createPost)
postRouter.delete("/delete", deletePost)

postRouter.post("/image/:petUUID", bodyParser.raw({type: ["image/jpeg", "image/png"], limit: "10mb"}), addImage)
postRouter.get("/getimage/:petUUID", getPetImage);
postRouter.get("/:postId", getUserFromPost);