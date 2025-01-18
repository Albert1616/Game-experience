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
export interface ApiResponseGames {
    results: Game[]
}