import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>TEST</h1>');
});

app.listen(port, () => console.log(`listening on port ${port}`));
