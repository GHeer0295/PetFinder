import { Request, Response, NextFunction } from 'express';
import { Database } from "../../Database/Database";

export const postMessage = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request: postMessage at ${req.url}`);
    const { conversationID, senderID, message, members, isNew = '' } = req.body;
    Database.saveMessage(conversationID, senderID, message, members, isNew)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500);
        });
}