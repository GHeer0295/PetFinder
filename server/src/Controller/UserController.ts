import { Request, Response, NextFunction } from 'express';
import { db } from "../Database/Database";
import bcrypt from 'bcrypt'
import { accounts, users } from '../Database/Schema'
import { SQLWrapper, eq } from 'drizzle-orm';


export const getUserInformation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let auth_id = req.session.user!
        let result = await db.select().from(users).where(eq(users.authId, auth_id))

        res.status(200).send(result)
     }
    catch(e) {
         return res.status(400).send(e)
    } 
}
