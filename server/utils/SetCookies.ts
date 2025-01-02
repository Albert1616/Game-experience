import { Response } from "express"

interface CookieProps {
    res: Response,
    acessToken: string,
    refreshToken: string,
    acessTokenExpiration: number,
    refreshTokenExpiration: number
}

export const SetCookies = async (
    { res, acessToken, refreshToken, acessTokenExpiration, refreshTokenExpiration }
        : CookieProps
) => {
    try {
        //GET MAX AGE
        // TIME EXPIRATION * 1000 TO TIME IN MILISECONDS
        const maxAgeAcess = acessTokenExpiration * 1000;
        const maxAgeRefresh = refreshTokenExpiration * 1000;

        //DEFINE ACESS COOKIE
        res.cookie("AcessToken", acessToken, {
            httpOnly: true,
            secure: true,
            maxAge: maxAgeAcess
        })

        //DEFINE REFRESH COOKIE
        res.cookie("RefreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: maxAgeRefresh
        })
    } catch (error) {
        res.status(500).json({ message: `Error to generate cookies ${error}` })
        return;
    }
}