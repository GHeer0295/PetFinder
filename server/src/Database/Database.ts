import { drizzle } from 'drizzle-orm/node-postgres/driver';
import { Pool } from 'pg';
import * as schema from './Schema';
import 'dotenv/config';

const getDbConfigOrThrow = (key: keyof typeof process.env): string => {
    const config = process.env[key];
    if(config) return config;

    throw new Error(`Missing configuration for ${key} in process.env`);
};

const dbPort = parseInt(getDbConfigOrThrow('DB_PORT'));
if(isNaN(dbPort)) throw new Error('DB_PORT must be a number');

const client = new Pool({
    host: getDbConfigOrThrow('DB_HOST'),
    user: getDbConfigOrThrow('DB_USER'),
    port: dbPort,
    password: getDbConfigOrThrow('DB_PASS'),
    database: getDbConfigOrThrow('DB_DATABASE')
});

export const db = drizzle(client, { schema });

export type User = typeof schema.users.$inferSelect
export type CreateUser = typeof schema.users.$inferInsert

export type Pet = typeof schema.pets.$inferSelect
export type CreatePet = typeof schema.pets.$inferInsert

export type Species = typeof schema.species.$inferSelect
export type CreateSpecies = typeof schema.species.$inferInsert

export type AdoptionPost = typeof schema.adoptionPosts.$inferSelect
export type CreateAdoptionPost = typeof schema.adoptionPosts.$inferInsert

export type AdoptionRequest = typeof schema.adoptionRequests.$inferSelect
export type CreateAdoptionRequest = typeof schema.adoptionRequests.$inferInsert

export type PostReview = typeof schema.postReviews.$inferSelect
export type CreatePostReview = typeof schema.postReviews.$inferInsert

export type PostInterest = typeof schema.postInterests.$inferSelect
export type CreatePostInterest = typeof schema.postInterests.$inferInsert

export type PostReject = typeof schema.postRejects.$inferSelect
export type CreatePostReject = typeof schema.postRejects.$inferInsert

export type PostFavourite = typeof schema.postFavourites.$inferSelect
export type CreatePostFavourite = typeof schema.postFavourites.$inferInsert

export type Tag = typeof schema.tags.$inferSelect
export type CreateTag = typeof schema.tags.$inferInsert

export type PostTag = typeof schema.postTags.$inferSelect
export type CreatePostTag = typeof schema.postTags.$inferInsert

export type Conversation = typeof schema.conversations.$inferSelect
export type CreateConversation = typeof schema.conversations.$inferInsert

export type ConversationMessage = typeof schema.conversationMessages.$inferSelect
export type CreateConversationMessage = typeof schema.conversationMessages.$inferInsert
