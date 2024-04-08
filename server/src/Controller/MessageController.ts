import { Request, Response, NextFunction } from 'express';
import { db } from "../Database/Database"
import { CreateConversationMessage, conversationMessages } from '../Database/Schema';
import { v4 as uuid } from 'uuid';
import { eq } from 'drizzle-orm';

// POST save message into databse
// possible edge case if conversation is not created
export const postMessage = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request: postMessage at ${req.url}`);
    const { conversationID, senderID, message, isNew} = req.body;
    const newMessage: CreateConversationMessage = {
        convoMsgId: uuid(),
        message: message,
        senderId: senderID,
        convoId: conversationID,
        createdAt: new Date()
    }

    try {
        await db.insert(conversationMessages).values(newMessage)
        res.sendStatus(200);
    } catch(error) {
        console.log(`${error}. While trying to save message in the database for ${conversationID}`)
        res.sendStatus(500).json("Could not send message");
    }
}

// GET messages for a conversation
export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
    const conversationID = req.params.conversationID;
    console.log(`Request: Getting messages for conversation: ${conversationID}`);
    try {
        const messages = await db.select().from(conversationMessages).where(eq(conversationMessages.convoId, conversationID)).orderBy(conversationMessages.createdAt);
        res.json(messages);
    } catch(error) {
        console.log(`${error}. While trying to get messages for ${conversationID}`)
        res.sendStatus(500).json("Could not get messags");
    }
}