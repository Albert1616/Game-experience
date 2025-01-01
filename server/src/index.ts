import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import passport from 'passport'

//Routes
import GamesRoutes from './routes/Games'
import UserRoutes from './routes/User'

const app = express();
app.use(express.json());
app.use(passport.initialize())

//USE .ENV
dotenv.config();

//USE CORS
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

app.use("/games", GamesRoutes)
app.use("/user", UserRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Serve is running on port ${PORT}`));
