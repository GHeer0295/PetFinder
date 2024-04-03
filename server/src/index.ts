import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import path from 'path'
import * as http from "http";
import * as socketIO from "socket.io";
import { conversationRouter } from "./Routes/ConversationRoute";
import { messageRouter } from "./Routes/MessageRoute";
import { authRouter } from "./Routes/AuthRoute";
import { profileRouter } from "./Routes/ProfileRoute";

import session from 'express-session'
import { searchRouter } from "./Routes/SearchRoute";
import { CreateConversationMessage, conversationMessages } from "./Database/Schema";
import { v4 as uuid } from 'uuid'
import { db } from "./Database/Database";

dotenv.config();

// SETUP
const app: Express = express();
const server: http.Server = http.createServer(app);
const io: socketIO.Server = new socketIO.Server();
let conversationRooms = new Set();
io.attach(server);

const port = process.env.PORT || 8000;
const session_key = process.env.SECRET_KEY || 'secret_sauce'


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// const RedisStore = connectRedis(session)
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    name: 'nsession',
    // store: new RedisStore({
    //     host: "localhost",
    //     port: 6379
    // }),
    secret: session_key,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000*60*60}
}))

// ROUTES 
app.use('/api/conversations', conversationRouter);
app.use('/api/message', messageRouter);
app.use('/api/auth', authRouter)
app.use('/api/search', searchRouter);
app.use('/api/profile', profileRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});

// SOCKET LISTENERS
io.on('connection', (socket: socketIO.Socket) => {
    console.log("Connected to websocket");

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        conversationRooms.clear();
    });

    socket.on('private message', async (data: any) => {
        const { convoId, senderId, message = '' } = data;
        console.log(`private  message request from sender: ${senderId}`);
        const newMessage: CreateConversationMessage = {
            convoMsgId: uuid(),
            message: message,
            createdAt: new Date(),
            senderId: senderId,
            convoId: convoId
        }

        try {
            await db.insert(conversationMessages).values(newMessage);
            console.log(`Emitting message back to client with conversationID: ${convoId}`);
            io.to(convoId).emit('get private message', newMessage);
        } catch(error) {
            console.error(`${error}. While trying to save message in the database.`)
            io.to(convoId).emit('send error', newMessage);
        }
    });

    // TODO: Change Type from any
    socket.on('join', (data: any) => {
        const conversationID = data.convoId;
        const userID = data.userID
        const userConvoKey = userID + "/" + conversationID

        // to stop multiple join requests
        if(!conversationRooms.has(userConvoKey)) {
            socket.join(conversationID);
            conversationRooms.add(userConvoKey);
            console.log(`Socket joined room: ${conversationID}; UserConvoKey: ${userConvoKey}`);
            io.to(conversationID).emit("joined", conversationID);
        }
    });
});