import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import { PrismaClient } from '@prisma/client'

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY!
}

const prisma = new PrismaClient();

passport.use(new JwtStrategy(opts, async function (jwt_Payload: { id: string }, done) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: jwt_Payload.id
            }
        })

        if (user) {
            return done(null, user)
        }

        return done("User not found", false)


    } catch (error) {
        return done(error, false)
    }
}))