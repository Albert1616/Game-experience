import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import passport from 'passport'
import cookieParser from 'cookie-parser';
import "../config/PassportJwtConfig"

//Routes
import GamesRoutes from './routes/Games'
import UserRoutes from './routes/User'

const app = express();
app.use(express.json());
app.use(passport.initialize())
app.use(cookieParser())

//USE .ENV
dotenv.config();

//USE CORS
const corsOptions = {
    origin: process.env.FRONT_END,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'UPDATE', 'DELETE'],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}
app.use(cors(corsOptions));

app.use("/games", GamesRoutes)
app.use("/user", UserRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Serve is running on port ${PORT}`));
