export interface Genre{
    name:string
}

interface Platform{
    name:string
}

interface Tag{
    name:string,
    id:string
}

export interface Game{
    id:number,
    name:string,
    background_image:string,
    rating:number,
    genres:Genre[],
    platforms:Platform[],
    tags:Tag[],
}

export interface ApiResponse{
    results:Game[];
}