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
    id: number,
    description: string,
    name: string,
    background_image: string,
    rating: number,
    genres: Genre[],
    parent_platforms: ParentPlatform[],
    tags: Tag[],
}

export interface GameComplete extends Game {
    description: string
}
export enum typesGames {
    RATING = "rating",
    LATEST = "latest"
}

export interface ApiResponse {
    results: Game[];
}

// export interface User {
//     name: string,
//     email: string,
//     password: string,
//     confirm_password: string
// }