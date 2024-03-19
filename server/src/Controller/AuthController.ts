import { Request, Response, NextFunction } from 'express';
import { Session } from 'express-session'
import { db } from "../Database/Database";
import bcrypt from 'bcrypt'
import { accounts } from '../Database/Schema'
import { eq } from 'drizzle-orm';

declare module 'express-session' {
    interface SessionData {
      user: string;
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, password} = req.body
        let result = await db.select().from(accounts).where(eq(accounts.username, username))
        if (result.length == 0) {
            return res.status(401).json({error: "User not found"})
        }

        const passwordMatch = await bcrypt.compare(password, result[0].password);
        if (passwordMatch){
            req.session.user = result[0].authId
            res.status(200).send("Login success!")
            next()
        }

        else {
            return res.status(401).json({error: "Wrong password"})
        }

    }
    catch(e) {
        return res.status(400).send(e)
    }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {username, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10); 
        const user = { username, password: hashedPassword };
        let result = await db.insert(accounts).values([user]);
        res.status(200).send(result)
        next()
     }
    catch(e) {
         return res.status(400).send(e)
    } 
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy((err: any) => {
        if (err) {
            console.log("Error: Failed to logout:", err)
            return res.status(500).send({error: 'Logout failed'});
        }

        res.status(200).send("Logout success!")
        next()
    })
}

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        next()
    }
    else {
        return res.status(403).send("User not authenticated")
    }
}


