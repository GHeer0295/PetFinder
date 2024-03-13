import { Request, Response, NextFunction } from 'express';
import  session from 'express-session'
import { db } from "../Database/Database";
import bcrypt from 'bcrypt'
import { accounts } from '../Database/Schema'
import { eq } from 'drizzle-orm';

interface SessionRequest extends Request {
    session: any;
  }

export const login = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
        const {username, password} = req.body
        let result = await db.select().from(accounts).where(eq(accounts.username, username))
        if (!result) {
            res.status(401).json({error: "User not found"})
            // res.redirect('/login')
            next()
        }

        const passwordMatch = await bcrypt.compare(password, result[0].password);
        if (passwordMatch){
            req.session.user = {userId: result[0].uid}
            res.status(200).send("Login success!")
        }

        else {
            res.status(401).json({error: "Wrong password"})
            // res.redirect('/login')
            next()
        }
    }
    catch(e) {
        res.status(400).send(e)
        next()
    }
}

export const register = async (req: SessionRequest, res: Response, next: NextFunction) => {
    try {
        let {username, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10); 
        const user = { username, password: hashedPassword };
        let result = await db.insert(accounts).values([user]);
        res.status(200).send(result)
        next()
     }
    catch(e) {
         res.status(400).send(e)
         next()
    } 
}

export const logout = async (req: SessionRequest, res: Response, next: NextFunction) => {
    req.session.destroy()
    res.status(200).send("Logout success!")
}