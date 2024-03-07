import { Request, Response, NextFunction } from 'express';
import { Database } from "../../Database/Database";

const NO_ERROR = 1000;

export const getConversations = (req: Request, res: Response, next: NextFunction) => {
    const conversationID = req.params.conversationID;
    console.log(`Request: getConversations at ${req.url} with ConversationID: ${conversationID}`);
    Database.getConversationMessages(conversationID)
        .then((data) => {
            return res.json(data);
        })
        .catch((error) => {
            return error;
        });
}

export const createNewConversation = (req: Request, res: Response, next: NextFunction) => {
    const { conversationID, members = ''} = req.body;
    console.log(`Request: createNewConversation at ${req.url} with ConversationID: ${conversationID}`);
    Database.createNewConversation(conversationID, members)
        .then((data) => {
            if(data !== NO_ERROR) {
                return res.status(400).json(`Cannot create new conversation right now.`);
            }

            return res.json("OK");
        })
        .catch((error) => {
            res.sendStatus(500);
            console.log(`${error}`);
        });
}

export const getUserConversations = (req: Request, res: Response, next: NextFunction) => {
    const UserUUID = req.params.userUUID;
    console.log(`Request: getUserConversations at ${req.url} with UserUUID: ${UserUUID}`);
    Database.getUserConversations(UserUUID)
        .then((data) => {
            // if data is of type number, then an error occured
            if(typeof data === 'number') {
                return res.status(500).json(`Failed to get User Conversations`);
            }

            return res.json(data);
        })
        .catch((error) => {
            res.status(500);
            console.log(error);
        })
}