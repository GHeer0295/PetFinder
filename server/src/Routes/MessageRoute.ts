import express, { Router } from 'express';
import { getMessages, postMessage } from '../Controller/MessageController'

export const messageRouter: Router = express.Router();

messageRouter.post('/', postMessage);
messageRouter.get('/:conversationID', getMessages)