import { Request, Response } from 'express'
import { VerifyRefreshToken } from './VerifyRefreshToken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const RefreshAcessToken = async (req: Request, res: Response) => {
    const oldRefreshToken = req.cookies.RefreshToken as string;

    const { error, detailsToken } = await VerifyRefreshToken(oldRefreshToken);

    if (error) {
        res.status(500).json({ message: "Refresh token invalid" })
        return;
    }

    const user = await prisma.user.findFirst({
        where: {
            id: detailsToken!.userId
        }
    })

    if (!user) {
        res.status(500).json({ message: "User not found" })
        return;
    }

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
}