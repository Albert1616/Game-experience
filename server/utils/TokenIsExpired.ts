import jwt from 'jsonwebtoken'

export const TokenIsExpired = (token: string) => {
    if (!token) {
        return false
    }

    const decodeToken = jwt.decode(token) as jwt.JwtPayload;

    if (!decodeToken) {
        return false;
    }

    if (!decodeToken.exp) {
        return false
    }

    const currenteDate = Date.now() / 1000;
    return decodeToken.exp < currenteDate;
}