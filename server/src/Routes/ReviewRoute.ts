import express, { Router } from 'express';
import { getUserReviews, addUserReviews} from "../Controller/ReviewController"
import { isLoggedIn } from '../Controller/AuthController';

export const reviewRouter: Router = express.Router();

reviewRouter.post('/:username', isLoggedIn, addUserReviews);
reviewRouter.get('/:username', isLoggedIn, getUserReviews);
