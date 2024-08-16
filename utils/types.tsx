export interface Genre{
    name:string
}

interface Platform{
    name:string
}

export interface Game{
    id:number,
    name:string,
    background_image:string,
    rating:number,
    genres:Genre[],
    platforms:Platform[],
}

export interface ApiResponse{
    results:Game[];
}