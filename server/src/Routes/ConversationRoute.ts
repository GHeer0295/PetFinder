import express, { Router } from 'express';
import { getConversations, createNewConversation, getUserConversations } from "../Controller/ConversationController"

export const conversationRouter: Router = express.Router();

conversationRouter.get('/:conversationID', getConversations);
conversationRouter.post('/new', createNewConversation);
conversationRouter.get('/user/:userUUID', getUserConversations);