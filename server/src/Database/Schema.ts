import {
    pgTable,
    varchar,
    text,
    integer,
    pgEnum,
    uuid,
    timestamp,
    ReferenceConfig,
    customType
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

const cascadeAction: ReferenceConfig['actions'] = {
    onUpdate: 'cascade',
    onDelete: 'cascade'
};

const pgTimestamp = () => timestamp('createdAt', { mode: 'date', withTimezone: true }).defaultNow().notNull();

const provinces = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'] as const;
export const provinceEnum = pgEnum('province', provinces);

const bytea = customType<{ data: string; notNull: false; default: false }>({
    dataType() {
      return "bytea";
    }
});

export const users = pgTable('users', {
    uid: uuid('uid').primaryKey().defaultRandom(),
    authId: uuid('ownerId').notNull().references(() => accounts.authId, cascadeAction),
    email: varchar('email', { length: 256 }).unique().notNull(),
    firstName: varchar('firstName', { length: 256 }).notNull(),
    lastName: varchar('lastName', { length: 256 }).notNull(),
    age: integer('age').notNull(),
    province: provinceEnum('province'),
    city: varchar('city', { length: 256 }),
    createdAt: pgTimestamp(),
});

export const accounts = pgTable('account', {
    authId: uuid('uid').primaryKey().defaultRandom(),
    username: varchar('username', { length: 256 }).notNull(),
    password: varchar('password', { length: 256 }).notNull()
})

export const accountRelations = relations(accounts, ({ one }) => ({
    user: one(users),
  }));



export const userRelations = relations(users, ({ one, many }) => ({
    pets: many(pets),
    adoptionPosts: many(adoptionPosts),
    adoptionRequests: many(adoptionRequests),
    postReviews: many(postReviews),
    interests: many(postInterests),
    rejects: many(postRejects),
    favourites: many(postFavourites),
    conversations: many(conversations)
}));

export const pets = pgTable('pets', {
    petId: uuid('petId').primaryKey().defaultRandom(),
    name: varchar('name', { length: 256 }).notNull(),
    age: integer('age').notNull(),
    createdAt: pgTimestamp(),
    
    ownerId: uuid('ownerId').notNull().references(() => users.uid, cascadeAction),
    speciesId: uuid('speciesId').notNull().references(() => species.speciesId, cascadeAction),
    petImage: bytea("petImage")
});

export const petRelations = relations(pets, ({ one, many }) => ({
    owner: one(users, {
        fields: [pets.ownerId],
        references: [users.uid]
    }),
    species: one(species, {
        fields: [pets.speciesId],
        references: [species.speciesId]
    }),
    adoptionPosts: many(adoptionPosts)
}));

export const species = pgTable('species', {
    speciesId: uuid('speciesId').primaryKey().defaultRandom(),
    name: varchar('name', { length: 256 }).notNull()
});

export const speciesRelations = relations(species, ({ many }) => ({
    pets: many(pets)
}));

export const adoptionPosts = pgTable('adoptionPosts', {
    adoptPostId: uuid('adoptPostId').primaryKey().defaultRandom(),
    desc: text('desc').notNull(),
    title: varchar('title', { length: 256 }).notNull(),
    province: provinceEnum('province').notNull(),
    city: varchar('city', { length: 256 }).notNull(),
    createdAt: pgTimestamp(),

    petId: uuid('petId').notNull().references(() => pets.petId, cascadeAction),
    userId: uuid('userId').notNull().references(() => users.uid, cascadeAction)
});

export const adoptionPostRelations = relations(adoptionPosts, ({ one, many }) => ({
    pet: one(pets, {
        fields: [adoptionPosts.petId],
        references: [pets.petId]
    }),
    user: one(users, {
        fields: [adoptionPosts.userId],
        references: [users.uid]
    }),
    adoptionRequests: many(adoptionRequests),
    postReviews: many(postReviews),
    interests: many(postInterests),
    rejects: many(postRejects),
    favourites: many(postFavourites),
    tags: many(postTags)
}));

const adoptionRequestStatus = ['PENDING', 'ACCEPTED', 'REJECTED'] as const;
export const adoptionRequestStatusEnum = pgEnum('adoptionRequestStatus', adoptionRequestStatus);

export const adoptionRequests = pgTable('adoptionRequests', {
    adoptReqId: uuid('adoptReqId').primaryKey().defaultRandom(),
    status: adoptionRequestStatusEnum('status').notNull(),
    createdAt: pgTimestamp(),

    postId: uuid('postId').notNull().references(() => adoptionPosts.adoptPostId, cascadeAction),
    requestorId: uuid('requestorId').notNull().references(() => users.uid, cascadeAction)
});

export const adoptionRequestRelations = relations(adoptionRequests, ({ one }) => ({
    post: one(adoptionPosts, {
        fields: [adoptionRequests.postId],
        references: [adoptionPosts.adoptPostId]
    }),
    requestor: one(users, {
        fields: [adoptionRequests.requestorId],
        references: [users.uid]
    })
}));

export const postReviews = pgTable('postReviews', {
    reviewId: uuid('reviewId').primaryKey().defaultRandom(),
    rating: integer('rating'),
    desc: text('desc').notNull(),
    createdAt: pgTimestamp(),

    postId: uuid('postId').notNull().references(() => adoptionPosts.adoptPostId, cascadeAction),
    reviewerId: uuid('reviewerId').notNull().references(() => users.uid, cascadeAction)
});

export const postReviewRelations = relations(postReviews, ({ one }) => ({
    post: one(adoptionPosts, {
        fields: [postReviews.postId],
        references: [adoptionPosts.adoptPostId]
    }),
    reviewer: one(users, {
        fields: [postReviews.reviewerId],
        references: [users.uid]
    })
}));

export const postInterests = pgTable('postInterests', {
    interestId: uuid('interestId').primaryKey().defaultRandom(),
    createdAt: pgTimestamp(),

    postId: uuid('postId').notNull().references(() => adoptionPosts.adoptPostId, cascadeAction),
    userId: uuid('userId').notNull().references(() => users.uid, cascadeAction)
});

export const postInterestRelations = relations(postInterests, ({ one }) => ({
    post: one(adoptionPosts, {
        fields: [postInterests.postId],
        references: [adoptionPosts.adoptPostId]
    }),
    user: one(users, {
        fields: [postInterests.userId],
        references: [users.uid]
    })
}));

export const postRejects = pgTable('postRejects', {
    rejectId: uuid('rejectId').primaryKey().defaultRandom(),
    createdAt: pgTimestamp(),

    postId: uuid('postId').notNull().references(() => adoptionPosts.adoptPostId, cascadeAction),
    userId: uuid('userId').notNull().references(() => users.uid, cascadeAction)
});

export const postRejectRelations = relations(postRejects, ({ one }) => ({
    post: one(adoptionPosts, {
        fields: [postRejects.postId],
        references: [adoptionPosts.adoptPostId]
    }),
    user: one(users, {
        fields: [postRejects.userId],
        references: [users.uid]
    })
}));

export const postFavourites = pgTable('postFavourites', {
    favId: uuid('favId').primaryKey().defaultRandom(),
    createdAt: pgTimestamp(),

    postId: uuid('postId').notNull().references(() => adoptionPosts.adoptPostId, cascadeAction),
    userId: uuid('userId').notNull().references(() => users.uid, cascadeAction)
});

export const postFavouriteRelations = relations(postFavourites, ({ one }) => ({
    post: one(adoptionPosts, {
        fields: [postFavourites.postId],
        references: [adoptionPosts.adoptPostId]
    }),
    user: one(users, {
        fields: [postFavourites.userId],
        references: [users.uid]
    })
}));

export const tags = pgTable('tags', {
    tagId: uuid('tagId').primaryKey().defaultRandom(),
    tag: varchar('tag', { length: 256 }).notNull()
});

export const tagRelations = relations(tags, ({ many }) => ({
    posts: many(postTags)
}));

export const postTags = pgTable('postTags', {
    postTagId: uuid('postTagId').primaryKey().defaultRandom(),

    postId: uuid('postId').notNull().references(() => adoptionPosts.adoptPostId, cascadeAction),
    tagId: uuid('tagId').notNull().references(() => tags.tagId, cascadeAction)
});

export const postTagRelations = relations(postTags, ({ one }) => ({
    post: one(adoptionPosts, {
        fields: [postTags.postId],
        references: [adoptionPosts.adoptPostId]
    }),
    tag: one(tags, {
        fields: [postTags.tagId],
        references: [tags.tagId]
    })
}));

export const conversations = pgTable('conversations', {
    convoId: uuid('convoId').primaryKey().defaultRandom(),
    members: uuid('members').array().notNull(),
    createdAt: pgTimestamp()
});

export const conversationRelations = relations(conversations, ({ many }) => ({
    messages: many(conversationMessages)
}));

export const conversationMessages = pgTable('conversationMessages', {
    convoMsgId: uuid('convoMsgId').primaryKey().defaultRandom(),
    message: text('message').notNull(),
    createdAt: pgTimestamp(),

    senderId: uuid('senderId').notNull().references(() => users.uid, cascadeAction),
    convoId: uuid('convoId').notNull().references(() => conversations.convoId, cascadeAction)
});

export const conversationMessageRelations = relations(conversationMessages, ({ one }) => ({
    sender: one(users, {
        fields: [conversationMessages.senderId],
        references: [users.uid]
    }),
    conversation: one(conversations, {
        fields: [conversationMessages.convoId],
        references: [conversations.convoId]
    })
}));

export type Provinces = typeof provinces[number]
export type AdoptionRequestStatus = typeof adoptionRequestStatus[number]

export type User = typeof users.$inferSelect
export type CreateUser = typeof users.$inferInsert

export type Account = typeof accounts.$inferSelect
export type CreateAccount = typeof accounts.$inferInsert

export type Pet = typeof pets.$inferSelect
export type CreatePet = typeof pets.$inferInsert

export type Species = typeof species.$inferSelect
export type CreateSpecies = typeof species.$inferInsert

export type AdoptionPost = typeof adoptionPosts.$inferSelect
export type CreateAdoptionPost = typeof adoptionPosts.$inferInsert

export type AdoptionRequest = typeof adoptionRequests.$inferSelect
export type CreateAdoptionRequest = typeof adoptionRequests.$inferInsert

export type PostReview = typeof postReviews.$inferSelect
export type CreatePostReview = typeof postReviews.$inferInsert

export type PostInterest = typeof postInterests.$inferSelect
export type CreatePostInterest = typeof postInterests.$inferInsert

export type PostReject = typeof postRejects.$inferSelect
export type CreatePostReject = typeof postRejects.$inferInsert

export type PostFavourite = typeof postFavourites.$inferSelect
export type CreatePostFavourite = typeof postFavourites.$inferInsert

export type Tag = typeof tags.$inferSelect
export type CreateTag = typeof tags.$inferInsert

export type PostTag = typeof postTags.$inferSelect
export type CreatePostTag = typeof postTags.$inferInsert

export type Conversation = typeof conversations.$inferSelect
export type CreateConversation = typeof conversations.$inferInsert

export type ConversationMessage = typeof conversationMessages.$inferSelect
export type CreateConversationMessage = typeof conversationMessages.$inferInsert
