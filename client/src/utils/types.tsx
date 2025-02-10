export interface Genre {
    name: string
}
interface Platform {
    id: number,
    name: string,
    slug: string
}
interface ParentPlatform {
    platform: Platform;
}

interface Tag {
    name: string,
    id: string
}

export interface Game {
    id: string,
    description_raw: string,
    name: string,
    background_image: string,
    rating: number,
    genres: Genre[],
    parent_platforms: ParentPlatform[],
    tags: Tag[],
}
export interface Session {
    status: string,
    message: string,
    acessToken: string,
    refreshToken: string,
    acessTokenExpiration: number,
    refreshTokenExpiration: number
}

export interface User {
    id: string,
    nome: string,
    email: string,
    password: string,
    confirm_password: string
}

export interface errorType {
    data: {
        message: string
    }
}
export enum typesGames {
    RATING = "rating",
    LATEST = "latest"
}

export interface JwtPayload {
    userId: string,
    exp: number
}