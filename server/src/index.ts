import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors';

//Routes
import GamesRoutes from './routes/Games'

const app = express();
app.use(express.json());

//USE .ENV
dotenv.config();

//USE CORS
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

app.use("/games", GamesRoutes)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Serve is running on port ${PORT}`));
