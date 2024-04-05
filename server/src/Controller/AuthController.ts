import { Request, Response, NextFunction } from 'express';
import { db } from "../Database/Database";
import bcrypt from 'bcrypt'
import { accounts, users } from '../Database/Schema'
import { SQLWrapper, eq } from 'drizzle-orm';

declare module 'express-session' {
    interface SessionData {
      user: string | SQLWrapper | undefined,
      name: string | SQLWrapper | undefined
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
            console.log(req.session.user)

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
        const account = { username, password: hashedPassword };
        let accountResults = await db.insert(accounts).values([account]).returning();
        let authId = accountResults[0].authId

        let {firstName, lastName, email, age, address, city, province} = req.body
        const user = {authId, firstName, lastName, email, age, address, city, province}
        let userResults = await db.insert(users).values([user]);

        res.status(200).send(userResults)
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
        console.log(req.session.user)

        next()
    }
    else {
        return res.status(403).send("User not authenticated")
    }
}

export const success = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send("User is authenticated")
}

