import { Request, Response, NextFunction } from 'express';
import { db } from '../Database/Database'
import { ConversationMessage, CreateConversation, conversationMessages, conversations, users } from '../Database/Schema';
import { arrayOverlaps, eq, ne } from 'drizzle-orm'
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
        res.sendStatus(500).json(`Could not get conversation`);
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
        let mapping = (await getUsernamesFromConversations(userUUID, data));
        res.json({data: data, mapping: Object.fromEntries(mapping)});
    } catch(error) {
        console.log(`${error}. While trying to get conversation data from database.`);
        res.sendStatus(500).json(`Could not get Conversations`);
    }
}

export const getUsernamesFromConversations = async (userUUID: string, data: any) => {
    console.log(`Request: getUsernamesFromConversations with UserUUID: ${userUUID}`);
    let convoToName = new Map<string, string>();

    for(let i = 0; i < data.length; i++) {
        const conversationObject = data[i];
        const members = conversationObject.members

        for(let name of members) {
            try {
                const response = await db.select().from(users).where(eq(users.uid, name));
                const userName = response.filter((user: any) => user.uid !== userUUID);

                const names = userName.map(person => person.firstName + " " + person.lastName).join(", ");
                if(names !== '')
                    convoToName.set(conversationObject.convoId, names);
            } catch(error) {
                console.log(error)
            }
        }
    }

    return convoToName;
}

export const createNewConversationDefaultMessage = async (req: Request, res: Response, next: NextFunction) => {
    console.log("body")
    console.log(req.body);
    const { toUser, senderId } = req.body;


    const convoId = uuid();

    const newConvo: CreateConversation = {
        convoId: convoId,
        members: [toUser, senderId],
        createdAt: new Date()
    }

    const defaultConversationMessage: ConversationMessage = {
        createdAt: new Date(),
        convoId: convoId,
        convoMsgId: uuid(),
        message: `Hi, is this pet available?`,
        senderId: senderId
    }

    try {
        const resultNewConversation = await db.insert(conversations).values(newConvo);
        const resultNewMessage = await db.insert(conversationMessages).values(defaultConversationMessage);
        next()
    } catch(error) {
        console.log(error);
    }
}