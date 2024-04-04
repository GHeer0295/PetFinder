import { v4 as uuid } from 'uuid';
import { eq } from 'drizzle-orm'
import { AdoptionPost, adoptionPosts, Pet, species, Species, pets } from '../Database/Schema';
import { Request, Response, NextFunction } from 'express';
import { db } from '../Database/Database'

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
    const postUUID = req.params.postUUID
    console.log(`Request: getPost at ${req.url} with PostUUID: ${postUUID}`);

    try {
        const data = await db.select().from(adoptionPosts).where(eq(adoptionPosts.adoptPostId, postUUID));
        res.json(data);
    } catch(error) {
        console.log(`${error}. While trying to get post from Database.`);
        res.send(400).json("Unable to get Post");
    }
}

export const getUserPosts = async (req: Request, res: Response, next: NextFunction) => {
    const userUUID = req.params.userUUID;
    console.log(userUUID);
    
    try {
        const data = await db.select().from(adoptionPosts).where(eq(adoptionPosts.userId, userUUID));
        res.json(data);
    } catch(error) {
        console.log(`${error}. While trying to get posts for user from Database.`);
        res.send(400).json("Unable to get posts");
    }
}

export const createPost = async(req: Request, res: Response, next: NextFunction) => {
    const postData = req.body;
    const newPetUUID = uuid();
    const newSpeciesUUID = uuid();

    const newSpecies: Species = {
        speciesId: newSpeciesUUID,
        name: postData.speciesName
    }

    const newPet: Pet = {
        name: postData.name,
        ownerId: postData.ownerId,
        age: parseInt(postData.age),
        createdAt: new Date(),
        petId: newPetUUID,
        speciesId: newSpeciesUUID
    }

    const newPost: AdoptionPost = {
        createdAt: new Date(),
        adoptPostId: uuid(),
        title: postData.title,
        desc: postData.desc,
        province: postData.province,
        city: postData.city,
        userId: postData.ownerId,
        petId: newPetUUID
    }

    let response_Specices;
    let response_Pet;
    let response_Post;
    
    try {
        response_Specices = await db.insert(species).values(newSpecies).returning();
        response_Pet  = await db.insert(pets).values(newPet).returning();
        response_Post = await db.insert(adoptionPosts).values(newPost).returning();

        res.json("OK");
    } catch(error) {
        console.log(`${error}. While trying to create a new post.`);

        if(response_Specices) {
            console.log("Incorrect insertion of a new specie. Deleteing")
            await db.delete(species).where(eq(species.speciesId, newSpeciesUUID))
        }

        if(response_Pet) {
            console.log("Incorrect insertion of a new pet. Deleteing")
            await db.delete(pets).where(eq(pets.petId, newPetUUID))
        }

        if(response_Post) {
            console.log("Incorrect insertion of a new post. Deleteing")
            await db.delete(species).where(eq(adoptionPosts.adoptPostId, newPost.adoptPostId));
        }

        res.status(400).json("Unable to create posts");
    }
}

export const deletePost = async(req: Request, res: Response, next: NextFunction) => {
    const  { postUUID } = req.body;

    try {
        await db.delete(adoptionPosts).where(eq(adoptionPosts.adoptPostId, postUUID))
        res.json('OK');
    } catch(error) {
        console.log(error);
        res.status(400).json("Unable to delete post");
    }
}