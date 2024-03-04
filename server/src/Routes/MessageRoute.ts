import express, { Router } from 'express';
import { postMessage } from '../Controller/MessageController';
export const messageRouter: Router = express.Router();

messageRouter.post('/', postMessage);