import { PrismaClient } from "@prisma/client"
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

interface webProps {
    userId: string
}

export const VerifyRefreshToken = async (refreshToken: string) => {
    try {

        const token = await prisma.userRefreshToken.findFirst({
            where: {
                token: refreshToken
            }
        })

        if (!token) {
            throw { status: "fail", message: "Refresh token not found" }
        }

        const maxData = token.createdAt.getTime() + token.expiration;

        if (Date.now() > maxData) {
            throw { state: "fail", message: "Token expired" }
        }

        const detailsToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY!) as webProps;

        return {
            detailsToken,
            error: false,
            message: "Token is valid"
        }
    } catch (error) {
        return {
            error: true,
            message: `Token invalid. ${error}`
        }
    }
}