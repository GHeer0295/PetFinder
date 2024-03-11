import dotenv from "dotenv";
import express, { Express, Request, Response, Router } from "express";
import cors from "cors";
import { Database } from "../Database/Database";
import * as http from "http";
import * as socketIO from "socket.io";
import { conversationRouter } from "./Routes/ConversationRoute";
import { messageRouter } from "./Routes/MessageRoute";
import { authRouter } from "./Routes/AuthRoute";
import session from 'express-session'

dotenv.config();

// SETUP
const app: Express = express();
const server: http.Server = http.createServer(app);
const io: socketIO.Server = new socketIO.Server();
io.attach(server);

const port = process.env.PORT || 8000;
const session_key = process.env.SECRET_KEY || 'secret'

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    name: 'nsession',
    secret: session_key,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}))

// ROUTES 
app.use('/api/conversations', conversationRouter);
app.use('/api/message', messageRouter);
app.use('/api/auth', authRouter)

server.listen(port, () => {
    try {
        Database.connect();
        console.log("LISTENING ON PORT " + port)
    } catch(error) {
        console.error(`Error: ${error}. while turning on server and connecting to database`);
    }
});

// SOCKET LISTENERS
io.on('connection', (socket: socketIO.Socket) => {
    console.log("CONNECTED to websocket");

    socket.on('disconnect', () => {
        console.log('Client disconnected');
      });

    socket.on('private message', (data) => {
        const { conversationID, senderID, message, members, isNew = '' } = data;
        Database.saveMessage(conversationID, senderID, message, members, isNew)
            .catch((error) => {
                console.error(`${error}`);
            });
        io.to(conversationID).emit('message', data);
    });

    socket.on('join', (data) => {
        socket.join(data);
        console.log(`JOINED: ${data}`);
    });
});