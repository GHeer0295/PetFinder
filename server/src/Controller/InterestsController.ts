import { Request, Response } from 'express';
import { db } from '../Database/Database';
import { adoptionPosts, pets, species, users, postInterests } from '../Database/Schema';
import { and, eq } from 'drizzle-orm';

export const LikePost = async (req: Request, res: Response): Promise<unknown> => {
    const auth_id = req.session.user!
    if (!auth_id) {
        return res.status(401).send('Unauthorized');
    }
    try {
        const [userInfo] = await db.select().from(users).where(eq(users.authId, auth_id))
        const { postId } = req.body;

        const existingLike = await db.select().from(postInterests)
            .where(and(eq(postInterests.postId, postId), eq(postInterests.userId, userInfo.uid)))
        console.log(existingLike);
        if (existingLike.length > 0) {
            return res.status(400).send('User has already liked this post');
        }

        await db.insert(postInterests).values({
            postId,
            userId: userInfo.uid
        });
    } catch(error) {
        console.log(error);
        res.sendStatus(500).json(`Error Liking Post`);
    }
    res.status(200).send('Post liked successfully');
};

export const getInterests = async (req: Request, res: Response): Promise<unknown> => {
    let auth_id = req.session.user!
    if (!auth_id) {
        return res.status(401).send('Unauthorized');
    }
    try {
        const [userInfo] = await db.select().from(users).where(eq(users.authId, auth_id))
        const data = await db
            .select({
                postId: adoptionPosts.adoptPostId,
                title: adoptionPosts.title,
                desc: adoptionPosts.desc,
                province: adoptionPosts.province,
                city: adoptionPosts.city,
                petName: pets.name,
                speciesName: species.name,
                petImage: pets.petImage,
            })
            .from(adoptionPosts)
            .innerJoin(postInterests, eq(adoptionPosts.adoptPostId, postInterests.postId))
            .innerJoin(pets, eq(adoptionPosts.petId, pets.petId))
            .innerJoin(species, eq(pets.speciesId, species.speciesId))
            .where(eq(postInterests.userId, userInfo.uid))
            res.json(data);
    } catch(error) {
        console.log(error);
        res.sendStatus(500).json(`Error getting interests list:`);
    }
};  