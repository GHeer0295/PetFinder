import express from "express";
import { getAvailableSpecies, getSearch } from "../Controller/SearchController";

export const searchRouter = express.Router();

searchRouter.get('/', getSearch);
searchRouter.get('/availableSpecies', getAvailableSpecies);
