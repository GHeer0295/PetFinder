import express, { Router } from 'express';
import { getConversation, createNewConversation, getUserConversations, getUsernamesFromConversations} from '../Controller/ConversationController';
export const conversationRouter: Router = express.Router();

conversationRouter.get('/:conversationID', getConversation);
conversationRouter.post('/new', createNewConversation);
conversationRouter.get('/user/:userUUID', getUserConversations);
conversationRouter.get('/usernames/:userUUID', getUsernamesFromConversations);