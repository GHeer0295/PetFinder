import { Request, Response, NextFunction } from 'express';
import { db } from "../Database/Database";
import bcrypt from 'bcrypt'
import { accounts, users, userReviews } from '../Database/Schema'
import { SQLWrapper, eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';


export const addUserReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let reviewerId: any = req.session.user!
        let username = req.params.username

        let revieweeResults = await db.select({auth_id: accounts.authId}).from(accounts).where(eq(accounts.username, username))
        let revieweeId = revieweeResults[0].auth_id

        let {rating, desc} = req.body
        const review = {reviewerId, revieweeId, rating, desc}
        let result = await db.insert(userReviews).values(review)

        console.log(result)
        return res.status(200).send(result)
    }
    catch(e) {
         return res.status(400).send(e)
    } 
}

export const getUserReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let username = req.params.username || req.session.name || ''

        const reviewer = alias(users, "reviewer")
        let result = await db.select({
            reviewerFirstName: reviewer.firstName,
            reviewerLastName: reviewer.lastName,
            rating: userReviews.rating,
            desc: userReviews.desc
        })
            .from(accounts)
            .innerJoin(userReviews, eq(userReviews.revieweeId, accounts.authId))
            .leftJoin(users, eq(userReviews.revieweeId, users.authId))
            .leftJoin(reviewer, eq(userReviews.reviewerId, reviewer.authId))
            .where(eq(accounts.username, username))

        return res.status(200).send(result)
     }
    catch(e) {
         return res.status(400).send(e)
    } 
}