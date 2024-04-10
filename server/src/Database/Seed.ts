import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'
import { db } from './Database';
import {
    CreateAccount,
    CreateAdoptionPost,
    CreateAdoptionRequest,
    CreateConversation,
    CreateConversationMessage,
    CreatePet,
    CreatePostFavourite,
    CreatePostInterest,
    CreatePostReject,
    CreatePostReview,
    CreatePostTag,
    CreateSpecies,
    CreateTag,
    CreateUser,
    accounts,
    adoptionPosts,
    adoptionRequests,
    conversationMessages,
    conversations,
    pets,
    postFavourites,
    postInterests,
    postRejects,
    postReviews,
    postTags,
    species,
    tags,
    users
} from './Schema';
import path from 'path';
import fs from 'fs';


export const addImage = async (imageName: string) => {
    try {
        const imagePath = path.join(__dirname, 'seedImages', imageName);
        const imgFile = await new Promise<Buffer>((resolve, reject) => {
            fs.readFile(imagePath, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
        return imgFile;
    } catch (error) {
        console.error('Error adding image:', error);
        throw error;
    }
};

const seedAccounts: CreateAccount[] = [
    {
        username: 'bob123',
        password: 'password',
        authId: uuidv4()
    },
    {
        username: 'john_doee22',
        password: 'john_password',
        authId: uuidv4()
    },
    {
        username: 'jemily2002',
        password: '123123',
        authId: uuidv4()
    },
    {
        username: 'wilson_liam',
        password: 'wilson',
        authId: uuidv4()
    }
];

const seedUsers: CreateUser[] = [
    {
        uid: uuidv4(),
        email: 'bob123@gmail.com',
        firstName: 'Bob',
        lastName: 'Smith',
        age: 25,
        province: 'BC',
        city: 'Vancouver',
        authId: seedAccounts[0].authId!
    },
    {
        uid: uuidv4(),
        email: 'john_doee22@gmail.com',
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        province: 'ON',
        city: 'Toronto',
        authId: seedAccounts[1].authId!
    },
    {
        uid: uuidv4(),
        email: 'jemily2002@gmail.com',
        firstName: 'Emily',
        lastName: 'Jones',
        age: 22,
        province: 'BC',
        city: 'Surrey',
        authId: seedAccounts[2].authId!
    },
    {
        uid: uuidv4(),
        email: 'wilson_liam@bca.com',
        firstName: 'Liam',
        lastName: 'Wilson',
        age: 19,
        province: 'BC',
        city: 'Vancouver',
        authId: seedAccounts[3].authId!
    },
    {
        uid: uuidv4(),
        email: 'sb_0304@yahoo.com',
        firstName: 'Sophie',
        lastName: 'Brown',
        age: 21,
        province: 'BC',
        city: 'Vancouver',
        authId: seedAccounts[3].authId!
    }
];

const seedSpecies: CreateSpecies[] = [
    { speciesId: uuidv4(), name: 'Dog' },
    { speciesId: uuidv4(), name: 'Cat' },
    { speciesId: uuidv4(), name: 'Rabbit' },
    { speciesId: uuidv4(), name: 'Parrot' },
    { speciesId: uuidv4(), name: 'Hamster' },
    { speciesId: uuidv4(), name: 'Fish' },
    { speciesId: uuidv4(), name: 'Turtle' },
    { speciesId: uuidv4(), name: 'Other' }
];

const seedPets: CreatePet[] = [
    {
        petId: uuidv4(),
        name: 'Buddy',
        age: 3,
        ownerId: seedUsers[0].uid!,
        speciesId: seedSpecies[0].speciesId!,
        petImage: "dog1.jpeg",
    },
    {
        petId: uuidv4(),
        name: 'Mittens',
        age: 4,
        ownerId: seedUsers[1].uid!,
        speciesId: seedSpecies[1].speciesId!,
        petImage: "cat1.jpeg",
    },
    {
        petId: uuidv4(),
        name: 'Bugs',
        age: 1,
        ownerId: seedUsers[2].uid!,
        speciesId: seedSpecies[4].speciesId!,
        petImage: "hamster1.jpeg",
    },
    {
        petId: uuidv4(),
        name: 'Polly',
        age: 2,
        ownerId: seedUsers[3].uid!,
        speciesId: seedSpecies[1].speciesId!,
        petImage: "cat2.jpeg",
    },
    {
        petId: uuidv4(),
        name: 'Fluffy',
        age: 1,
        ownerId: seedUsers[1].uid!,
        speciesId: seedSpecies[0].speciesId!,
        petImage: "dog2.jpeg",
    },
    {
        petId: uuidv4(),
        name: 'BroBro',
        age: 2,
        ownerId: seedUsers[1].uid!,
        speciesId: seedSpecies[0].speciesId!,
        petImage: "dog2.jpeg",
    },
    {
        petId: uuidv4(),
        name: 'Foofy',
        age: 3,
        ownerId: seedUsers[1].uid!,
        speciesId: seedSpecies[0].speciesId!,
        petImage: "dog3.jpeg",
    },
    {
        petId: uuidv4(),
        name: 'Chad',
        age: 3,
        ownerId: seedUsers[1].uid!,
        speciesId: seedSpecies[0].speciesId!,
        petImage: "dog5.jpeg",
    },
    {
        petId: uuidv4(),
        name: 'Lucky',
        age: 3,
        ownerId: seedUsers[1].uid!,
        speciesId: seedSpecies[0].speciesId!,
        petImage: "dog6.jpeg",
    },
    {
        petId: uuidv4(),
        name: 'York',
        age: 3,
        ownerId: seedUsers[1].uid!,
        speciesId: seedSpecies[0].speciesId!,
        petImage: "dog7.jpeg",
    },
    {
        petId: uuidv4(),
        name: 'Poodle',
        age: 3,
        ownerId: seedUsers[1].uid!,
        speciesId: seedSpecies[1].speciesId!,
        petImage: "cat4.jpeg",
    },
    {
        petId: uuidv4(),
        name: 'Ali',
        age: 3,
        ownerId: seedUsers[1].uid!,
        speciesId: seedSpecies[7].speciesId!,
        petImage: "aligator1.jpeg",
    },
];

const seedAdoptionPosts: CreateAdoptionPost[] = [
    {
        adoptPostId: uuidv4(),
        desc: 'I have a dog that needs a new home',
        title: 'Dog needs a new home',
        petId: seedPets[0].petId!,
        userId: seedUsers[0].uid!,
        city: 'Vancouver',
        province: 'BC'
    },
    {
        adoptPostId: uuidv4(),
        desc: 'I have a cat that needs a new home',
        title: 'Cat needs a new home',
        petId: seedPets[1].petId!,
        userId: seedUsers[1].uid!,
        city: 'Toronto',
        province: 'ON'
    },
    {
        adoptPostId: uuidv4(),
        desc: 'I have a rabbit that needs a new home',
        title: 'Rabbit needs a new home',
        petId: seedPets[2].petId!,
        userId: seedUsers[2].uid!,
        city: 'Surrey',
        province: 'BC'
    },
    {
        adoptPostId: uuidv4(),
        desc: 'I have a hamster that needs a new home',
        title: 'Hamster needs a new home',
        petId: seedPets[4].petId!,
        userId: seedUsers[1].uid!,
        city: 'Vancouver',
        province: 'BC'
    },
    {
        adoptPostId: uuidv4(),
        desc: 'I have a doge',
        title: 'Doge needs a new home',
        petId: seedPets[5].petId!,
        userId: seedUsers[1].uid!,
        city: 'Vancouver',
        province: 'BC'
    },
    {
        adoptPostId: uuidv4(),
        desc: 'Doggy too big',
        title: 'Doggy needs a new home',
        petId: seedPets[6].petId!,
        userId: seedUsers[1].uid!,
        city: 'Vancouver',
        province: 'BC'
    },
    {
        adoptPostId: uuidv4(),
        desc: 'Doggy loves to play, I go to work too much.',
        title: 'Too much work',
        petId: seedPets[7].petId!,
        userId: seedUsers[1].uid!,
        city: 'Vancouver',
        province: 'BC'
    },
    {
        adoptPostId: uuidv4(),
        desc: 'Want big dog',
        title: 'Small doggy',
        petId: seedPets[8].petId!,
        userId: seedUsers[1].uid!,
        city: 'Vancouver',
        province: 'BC'
    },
    {
        adoptPostId: uuidv4(),
        desc: 'Selling cute dog',
        title: 'Cute Dog For Sale',
        petId: seedPets[9].petId!,
        userId: seedUsers[1].uid!,
        city: 'Vancouver',
        province: 'BC'
    },
    {
        adoptPostId: uuidv4(),
        desc: 'Cute cat',
        title: 'Cute Cat',
        petId: seedPets[10].petId!,
        userId: seedUsers[1].uid!,
        city: 'Burnaby',
        province: 'BC'
    },
    {
        adoptPostId: uuidv4(),
        desc: 'Cute Aligator',
        title: 'Aligator For Sale',
        petId: seedPets[11].petId!,
        userId: seedUsers[1].uid!,
        city: 'Burnaby',
        province: 'BC'
    },
];

const seedAdoptionRequests: CreateAdoptionRequest[] = [
    {
        status: 'PENDING',
        postId: seedAdoptionPosts[0].adoptPostId!,
        requestorId: seedUsers[1].uid!
    },
    {
        status: 'REJECTED',
        postId: seedAdoptionPosts[1].adoptPostId!,
        requestorId: seedUsers[2].uid!
    },
    {
        status: 'ACCEPTED',
        postId: seedAdoptionPosts[1].adoptPostId!,
        requestorId: seedUsers[4].uid!
    },
    {
        status: 'PENDING',
        postId: seedAdoptionPosts[2].adoptPostId!,
        requestorId: seedUsers[4].uid!
    },
    {
        status: 'PENDING',
        postId: seedAdoptionPosts[2].adoptPostId!,
        requestorId: seedUsers[0].uid!
    }
];

const seedPostReviews: CreatePostReview[] = [
    {
        rating: 5,
        desc: 'Great pet',
        postId: seedAdoptionPosts[0].adoptPostId!,
        reviewerId: seedUsers[1].uid!
    },
    {
        rating: 4,
        desc: 'Cool pet',
        postId: seedAdoptionPosts[0].adoptPostId!,
        reviewerId: seedUsers[2].uid!
    },
    {
        desc: 'Nice pet',
        postId: seedAdoptionPosts[1].adoptPostId!,
        reviewerId: seedUsers[4].uid!
    }
];

const seedPostInterests: CreatePostInterest[] = [
    {
        postId: seedAdoptionPosts[0].adoptPostId!,
        userId: seedUsers[1].uid!
    },
    {
        postId: seedAdoptionPosts[0].adoptPostId!,
        userId: seedUsers[2].uid!
    },
    {
        postId: seedAdoptionPosts[0].adoptPostId!,
        userId: seedUsers[3].uid!
    },
    {
        postId: seedAdoptionPosts[3].adoptPostId!,
        userId: seedUsers[0].uid!
    },
    {
        postId: seedAdoptionPosts[3].adoptPostId!,
        userId: seedUsers[4].uid!
    },
    {
        postId: seedAdoptionPosts[2].adoptPostId!,
        userId: seedUsers[4].uid!
    }
];

const seedPostRejects: CreatePostReject[] = [
    {
        postId: seedAdoptionPosts[0].adoptPostId!,
        userId: seedUsers[4].uid!
    },
    {
        postId: seedAdoptionPosts[3].adoptPostId!,
        userId: seedUsers[0].uid!
    },
    {
        postId: seedAdoptionPosts[3].adoptPostId!,
        userId: seedUsers[4].uid!
    }
];

const seedPostFavourites: CreatePostFavourite[] = [
    {
        postId: seedAdoptionPosts[0].adoptPostId!,
        userId: seedUsers[1].uid!
    },
    {
        postId: seedAdoptionPosts[0].adoptPostId!,
        userId: seedUsers[3].uid!
    },
    {
        postId: seedAdoptionPosts[3].adoptPostId!,
        userId: seedUsers[0].uid!
    }
];

const seedTags: CreateTag[] = [
    {
        tagId: uuidv4(),
        tag: 'Cute'
    },
    {
        tagId: uuidv4(),
        tag: 'Friendly'
    },
    {
        tagId: uuidv4(),
        tag: 'Playful'
    },
    {
        tagId: uuidv4(),
        tag: 'Loyal'
    }
];

const seedPostTags: CreatePostTag[] = [
    {
        postId: seedAdoptionPosts[0].adoptPostId!,
        tagId: seedTags[0].tagId!
    },
    {
        postId: seedAdoptionPosts[0].adoptPostId!,
        tagId: seedTags[1].tagId!
    },
    {
        postId: seedAdoptionPosts[0].adoptPostId!,
        tagId: seedTags[2].tagId!
    },
    {
        postId: seedAdoptionPosts[3].adoptPostId!,
        tagId: seedTags[3].tagId!
    },
    {
        postId: seedAdoptionPosts[2].adoptPostId!,
        tagId: seedTags[2].tagId!
    }
];

const seedConversations: CreateConversation[] = [
    {
        convoId: uuidv4(),
        members: [seedUsers[0].uid!, seedUsers[1].uid!]
    },
    {
        convoId: uuidv4(),
        members: [seedUsers[1].uid!, seedUsers[2].uid!]
    },
    {
        convoId: uuidv4(),
        members: [seedUsers[1].uid!, seedUsers[4].uid!]
    },
    {
        convoId: uuidv4(),
        members: [seedUsers[2].uid!, seedUsers[4].uid!]
    },
    {
        convoId: uuidv4(),
        members: [seedUsers[2].uid!, seedUsers[0].uid!]
    }
];

const seedConversationMessages: CreateConversationMessage[] = [
    {
        message: 'Hello',
        senderId: seedUsers[1].uid!,
        convoId: seedConversations[0].convoId!
    },
    {
        message: 'Hello, how are you?',
        senderId: seedUsers[0].uid!,
        convoId: seedConversations[0].convoId!
    },
    {
        message: 'I am good, thank you',
        senderId: seedUsers[1].uid!,
        convoId: seedConversations[0].convoId!
    },
    {
        message: 'Hi there',
        senderId: seedUsers[2].uid!,
        convoId: seedConversations[1].convoId!
    },
    {
        message: 'Hello, we\'ve already found a new home for our pet',
        senderId: seedUsers[1].uid!,
        convoId: seedConversations[1].convoId!
    },
    {
        message: 'No problem, have a great day.',
        senderId: seedUsers[2].uid!,
        convoId: seedConversations[1].convoId!
    },
    {
        message: 'Hello',
        senderId: seedUsers[4].uid!,
        convoId: seedConversations[2].convoId!
    },
    {
        message: 'Hi',
        senderId: seedUsers[1].uid!,
        convoId: seedConversations[2].convoId!
    },
    {
        message: 'I am interested in your pet, is it still available?',
        senderId: seedUsers[4].uid!,
        convoId: seedConversations[2].convoId!
    },
    {
        message: 'Yes, it is still available. Would you like to meet it?',
        senderId: seedUsers[1].uid!,
        convoId: seedConversations[2].convoId!
    },
    {
        message: 'Yes, I would like to meet it',
        senderId: seedUsers[4].uid!,
        convoId: seedConversations[2].convoId!
    },
    {
        message: 'Hello',
        senderId: seedUsers[4].uid!,
        convoId: seedConversations[3].convoId!
    },
    {
        message: 'Hello!',
        senderId: seedUsers[2].uid!,
        convoId: seedConversations[3].convoId!
    },
    {
        message: 'How are you doing',
        senderId: seedUsers[4].uid!,
        convoId: seedConversations[3].convoId!
    },
    {
        message: 'Hello, I hope you are doing well. I am interested in purchasing your pet. Is it still available?',
        senderId: seedUsers[0].uid!,
        convoId: seedConversations[4].convoId!
    }
];

console.log('Seeding...');
db
    .transaction(async tx => {
        const seedAccountsHashed = seedAccounts.map(async account => ({
            ...account,
            password: await bcrypt.hash(account.password, 10)
        }));
        const seedPetsWithImages = seedPets.map(async (pet,index) => ({
            ...pet,
            petImage: await addImage(pet.petImage),
        }))
        await tx.insert(accounts).values(await Promise.all(seedAccountsHashed));
        
        await tx.insert(users).values(seedUsers);
        await tx.insert(species).values(seedSpecies);
        await tx.insert(pets).values(await Promise.all(seedPetsWithImages));
        await tx.insert(adoptionPosts).values(seedAdoptionPosts);
        await tx.insert(adoptionRequests).values(seedAdoptionRequests);
        await tx.insert(postReviews).values(seedPostReviews);
        await tx.insert(postInterests).values(seedPostInterests);
        await tx.insert(postRejects).values(seedPostRejects);
        await tx.insert(postFavourites).values(seedPostFavourites);
        await tx.insert(tags).values(seedTags);
        await tx.insert(postTags).values(seedPostTags);
        await tx.insert(conversations).values(seedConversations);
        await tx.insert(conversationMessages).values(seedConversationMessages);
    })
    .then(async () => {
        console.log('Seeding complete');
        process.exit(0);
    })
    .catch((err) => {
        console.error(`Error seeding: ${err}`);
        process.exit(1);
    })
