import { Request, Response, NextFunction } from 'express'
import { TokenIsExpired } from '../../utils/TokenIsExpired';

export const SetHeaderBaeren = async (
    req: Request, res: Response,
    next: NextFunction) => {
    try {
        const acessToken = req.cookies.AcessToken;

        if (acessToken && !TokenIsExpired(acessToken)) {
            req.headers["authorization"] = `Bearer ${acessToken}`
        }
        next()
    } catch (error) {
        res.status(500).json({ message: `Failed to define bearen header. ${error}` })
    }


}