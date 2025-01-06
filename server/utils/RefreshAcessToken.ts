import { Request, Response } from 'express'
import { VerifyRefreshToken } from './VerifyRefreshToken';
import { PrismaClient } from '@prisma/client';
import { generateToken } from './GenerateToken';

const prisma = new PrismaClient()

export const RefreshAcessToken = async (req: Request, res: Response) => {
    try {
        // Current refresh token
        const oldRefreshToken = req.cookies.RefreshToken as string;

        //Verify if the current refresh token is valid
        const { error, detailsToken } = await VerifyRefreshToken(oldRefreshToken);

        if (error) {
            res.status(500).json({ message: "Refresh token invalid" })
            return;
        }

        // Find user based Refresh Token user id
        const user = await prisma.user.findFirst({
            where: {
                id: detailsToken!.userId
            }
        })

        if (!user) {
            res.status(500).json({ message: "User not found" })
            return;
        }

        // Verify if refresh token exists
        const userRefreshToken = await prisma.userRefreshToken.findFirst({
            where: {
                userId: detailsToken!.userId
            }
        })

        if (!userRefreshToken) {
            res.status(500).json({ message: "Token invalid" })
            return;
        }

        if (oldRefreshToken !== userRefreshToken.token || userRefreshToken.blackedList) {
            res.status(401).json({ message: "User unauthorized" });
            return;
        }

        const {
            acessToken, refreshToken,
            acessTokenExpiration,
            refreshTokenExpiration } = await generateToken(user)

        if (!acessToken || !refreshToken || !acessTokenExpiration || !refreshTokenExpiration) {
            res.status(500).json({ message: "Error to generate acess token" })
            return;
        }

        return {
            newAcessToken: acessToken,
            newRefreshToken: refreshToken,
            newAcessTokenExpiration: acessTokenExpiration,
            newRefreshTokenExpiration: refreshTokenExpiration,
        };
    } catch (error) {
        res.status(500).json({ message: "Error to refresh acess token" })
        return;
    }
}