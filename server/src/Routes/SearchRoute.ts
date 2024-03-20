import express from "express";
import { getSearch } from "../Controller/SearchController";

export const searchRouter = express.Router();

searchRouter.get('/', getSearch);
