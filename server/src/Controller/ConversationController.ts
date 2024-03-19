import { Request, Response, NextFunction } from 'express';
import { db } from '../Database/Database'
import { CreateConversation, conversations } from '../Database/Schema';
import { arrayOverlaps, eq } from 'drizzle-orm'
import { v4 as uuid } from 'uuid';

// based on conversation UUID
// May not be needed
export const getConversation = async (req: Request, res: Response, next: NextFunction) => {
    const conversationID = req.params.conversationID;
    console.log(`Request: getConversations at ${req.url} with ConversationID: ${conversationID}`);
    try {
        const data = await db.select().from(conversations).where(eq(conversations.convoId, conversationID));
        res.json(data)
    } catch(error) {
        console.log(`${error}. While trying to insert new conversation into database.`);
        res.sendStatus(500).json(`Could not create conversation`);
    }
}

// POST create new conversation for user
export const createNewConversation = async (req: Request, res: Response, next: NextFunction) => {
    const members = req.body.members
    console.log(`Request: createNewConversation at ${req.url}`);

    const newConvo: CreateConversation = {
        convoId: uuid(),
        members: members,
        createdAt: new Date()
    }

    try {
        await db.insert(conversations).values(newConvo);
        res.sendStatus(200);
    } catch(error) {
        console.log(`${error}. While trying to insert new conversation into database.`);
        res.sendStatus(500).json(`Could not create conversation`);
    }
}

// GET all user converstions
export const getUserConversations = async (req: Request, res: Response, next: NextFunction) => {
    const userUUID = req.params.userUUID;
    console.log(`Request: getUserConversations at ${req.url} with UserUUID: ${userUUID}`);

    try {
        const data = await db.select().from(conversations).where(arrayOverlaps(conversations.members, [userUUID]))
        res.json(data);
    } catch(error) {
        console.log(`${error}. While trying to get conversation data from database.`);
        res.sendStatus(500).json(`Could not get Conversations`);
    }
}