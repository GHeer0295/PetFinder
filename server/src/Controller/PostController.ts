import { v4 as uuid } from 'uuid';
import { eq } from 'drizzle-orm'
import { AdoptionPost, adoptionPosts, Pet, species, Species, pets } from '../Database/Schema';
import { Request, Response, NextFunction } from 'express';
import { db } from '../Database/Database'

// export const getPost = async (req: Request, res: Response, next: NextFunction) => {
//     console.log(req.params)
//     const postUUID = req.params.postUUID
//     console.log(`Request: getPost at ${req.url} with PostUUID: ${postUUID}`);

//     try {
//         const data = await db.select().from(adoptionPosts).where(eq(adoptionPosts.adoptPostId, postUUID));
//         res.json(data);
//     } catch(error) {
//         console.log(`${error}. While trying to get post from Database.`);
//         res.sendStatus(400).send("Unable to get Post");
//     }
// }

export const getUserPosts = async (req: Request, res: Response, next: NextFunction) => {
    const userUUID = req.params.userUUID;
    
    try {
        const data = await db.select().from(adoptionPosts).where(eq(adoptionPosts.userId, userUUID));
        res.json(data);
    } catch(error) {
        console.log(`${error}. While trying to get posts for user from Database.`);
        res.sendStatus(400).send("Unable to get posts");
    }
}

export const createPost = async(req: Request, res: Response, next: NextFunction) => {
    const postData = req.body;
    console.log("create post");
    console.log(postData);

    const newSpecies: Species = {
        speciesId: postData.newSpeciesUUID,
        name: postData.speciesName
    }

    const newPet: Pet = {
        name: postData.name,
        ownerId: postData.ownerId,
        age: parseInt(postData.age),
        createdAt: new Date(),
        petId: postData.newPetUUID,
        speciesId: postData.newSpeciesUUID,
        petImage: postData.petImage
    }

    const newPost: AdoptionPost = {
        createdAt: new Date(),
        adoptPostId: uuid(),
        title: postData.title,
        desc: postData.desc,
        province: postData.province,
        city: postData.city,
        userId: postData.ownerId,
        petId: postData.newPetUUID
    }

    let response_Specices;
    let response_Pet;
    let response_Post;
    
    try {
        response_Specices = await db.insert(species).values(newSpecies).returning();
        response_Pet  = await db.insert(pets).values(newPet).returning();
        response_Post = await db.insert(adoptionPosts).values(newPost).returning();

        console.log("OKAY");
        res.json("OK");
    } catch(error) {
        console.log(`${error}. While trying to create a new post.`);

        if(response_Specices) {
            console.log("Incorrect insertion of a new specie. Deleteing")
            await db.delete(species).where(eq(species.speciesId, postData.newSpeciesUUID))
        }

        if(response_Pet) {
            console.log("Incorrect insertion of a new pet. Deleteing")
            await db.delete(pets).where(eq(pets.petId, postData.newPetUUID))
        }

        if(response_Post) {
            console.log("Incorrect insertion of a new post. Deleteing")
            await db.delete(species).where(eq(adoptionPosts.adoptPostId, newPost.adoptPostId));
        }

        res.status(400).send("Unable to create posts");
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

export const addImage = async(req: Request, res: Response, next: NextFunction) => {
    console.log("adding image")
    console.log(req.params.petUUID);

    try {
        const result = await db.update(pets).set({petImage: req.body}).where(eq(pets.petId, req.params.petUUID));
        res.json(result);
    } catch(error) {
        console.log(error);
    }
}

export const getPetImage = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.petUUID

    try {
        const result = await db.select().from(pets).where(eq(pets.petId, id));
        res.json(result);
    } catch(error) {
        console.log(error);
    }
}

export const getUserFromPost = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.postId;

    try {
        const result = await db.select().from(adoptionPosts).where(eq(adoptionPosts.adoptPostId, id));
        res.json(result[0].userId);
    } catch(error) {
        console.log(error);
    }
}