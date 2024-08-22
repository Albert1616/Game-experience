export interface Genre{
    name:string
}
interface PlatformDetails{
    id:number,
    name:string,
    slug:string
}
interface ParentPlataform{
    platform:PlatformDetails
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
    parent_platform:ParentPlataform[],
    tags:Tag[],
}

export interface GameComplete extends Game{
    description:string
}

export interface ApiResponse{
    results:Game[];
}