import { Request, Response, NextFunction } from 'express';
import { db } from "../Database/Database";
import bcrypt from 'bcrypt'
import { accounts, userReviews, users } from '../Database/Schema'
import { SQLWrapper, avg, eq, sql } from 'drizzle-orm';


export const getUserInformation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let auth_id = req.session.user!
        let result = await db.select({        
            email: users.email,
            firstName: users.firstName,
            lastName: users.lastName,
            age: users.age,
            address: users.address,
            province: users.province,
            description: users.description,
            city: users.city,
            rating: sql<number>`cast(avg(${userReviews.rating}) as int)`,
            userId: users.uid
        })
            .from(users)
            .leftJoin(userReviews, eq(users.authId, userReviews.revieweeId))
            .where(eq(users.authId, auth_id))
            .groupBy(users.uid)

        return res.status(200).send(result)
     }
    catch(e) {
         return res.status(400).send(e)
    } 
}

export const getOtherUserInformation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let username = req.params.username || req.session.name || ''

        let result = await db.select({
            email: users.email,
            firstName: users.firstName,
            lastName: users.lastName,
            age: users.age,
            address: users.address,
            province: users.province,
            description: users.description,
            city: users.city,
            rating: sql<number>`cast(avg(${userReviews.rating}) as int)`
        })
        .from(users)
        .innerJoin(accounts, eq(accounts.authId, users.authId))
        .leftJoin(userReviews, eq(accounts.authId, userReviews.revieweeId))
        .where(eq(accounts.username, username))
        .groupBy(users.uid)

        return res.status(200).send(result)
     }
    catch(e) {
         return res.status(400).send(e)
    } 
}

export const updateUserInformation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let auth_id = req.session.user!
        let result = await db.update(users).set({description: req.body.description}).where(eq(users.authId, auth_id))
        return res.status(200).send(result)
     }
    catch(e) {
         return res.status(400).send(e)
    } 
}
