'use client'

import Container from "@/components/Container";
import { GameComplete } from "@/utils/types";
import { API_KEY, BASE_URL } from "@/utils/utils";
import { CircularProgress, Rating } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Games } from "@mui/icons-material";

interface PropsUrl{
    params:{
        id:number
    }
}

export default function GamePage({params}:PropsUrl){
    const [game, setGame] = useState<GameComplete>();
    const [loading, setLoading] = useState<boolean>(true);
    console.log(params.id);

    useEffect(() => {
        fetch(`${BASE_URL}/games/${params.id}?key=${API_KEY}`)
        .then((response) => response.json())
        .then((data:GameComplete) => {
            setGame(data)
            setLoading(false);
        })
    }, [params.id])

    const Tag = (name:string) => {
        return <div className="py-1 px-2 bg-gray-600/40 rounded-lg">{name}</div>
    }
    
    if(loading) return 
    <div className="w-full h-full flex items-center justify-center">
        <CircularProgress />
    </div>
    return (
        <Container className="md:p-3 lg:p-4">
            <div className="p-4 flex flex-col gap-4 bg-center">
                <div className="flex flex-col gap-3">
                    <h1 className="text-5xl font-bold text-balance text-justify">{game!.name}</h1>
                    <div className="flex gap-2 items-center">
                        <Rating value={game!.rating} icon={<StarIcon/>} 
                        emptyIcon={<StarBorderIcon sx={{color:'white'}}/>} precision={0.5} size='small' readOnly/> 
                        <p>{game!.rating}</p>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-7">
                    <Image 
                    src={game!.background_image} 
                    alt="Game image"
                    width={1200}
                    height={800}
                    quality={100}
                    priority
                    onLoad={() => <div className="h-full w-full bg-gray-500" />}
                    className="lg:w-[60%] h-full"/>
                    <p className="text-xl text-balance text-justify lg:w-[40%]">{game?.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <h3>Gêneros</h3>
                        <div className="flex gap-1 items-center">
                            {game!.genres.map((genre) => (
                                Tag(genre.name)
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3>tags</h3>
                        <div className="flex gap-1 items-center">
                            {game!.tags.length > 0 ? game!.tags.map((tag) => (
                                Tag(tag.name)
                            )) : <p className="text-xl font-bold">-</p>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3>tags</h3>
                        <div className="flex gap-1 items-center">
                            {game!.parent_platform.map((data) => <p>{data.platform.name}</p>)}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}