import { PrismaClient, User } from '@prisma/client'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config();
const prisma = new PrismaClient();

export const generateToken = async (user: User) => {
    try {
        const payload = { userId: user.id };

        // ACESS TOKEN EXPIRATION = 1800 SECONDS
        const acessTokenExpiration = 60 * 60
        // DEFINE ACESS TOKEN
        const acessToken = jwt.sign({ userId: user.id },
            process.env.JWT_SECRET_KEY!, { expiresIn: acessTokenExpiration })


        // REFRESH TOKEN EXPIRATION = 5d OR 432000 SECONDS
        const refreshTokenExpiration = 60 * 60 * 24 * 5;
        // DEFINE REFRESH TOKEN
        const refreshToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_REFRESH_SECRET_KEY!, { expiresIn: refreshTokenExpiration }
        )

        // VERIFY IF REFRESH TOKEN ALREADY DEFINE FOR USER
        const existisRefreshToken = await prisma.userRefreshToken.findFirst({
            where: {
                userId: user.id
            }
        })

        // IF TRUE, REMOVE REFRESH TOKEN
        if (existisRefreshToken) {
            const deleteToken = await prisma.userRefreshToken.delete({
                where: {
                    id: existisRefreshToken.id
                }
            })
        }

        // SAVE REGISTER FOR REFRESH TOKEN
        const newRefreshToken = await prisma.userRefreshToken.create({
            data: {
                userId: user.id,
                token: refreshToken,
                expiration: refreshTokenExpiration
            }
        })

        return Promise.resolve({ acessToken, refreshToken, acessTokenExpiration, refreshTokenExpiration });

    } catch (error) {
        return Promise.reject(`Error to generate Web token. ${error}`)
    }
}