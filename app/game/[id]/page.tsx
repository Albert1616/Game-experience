'use client'

import Container from "@/components/Container";
import { GameComplete } from "@/utils/types";
import { API_KEY, BASE_URL } from "@/utils/utils";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react"

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
    
    if(loading) return 
    <div className="w-full h-full flex items-center justify-center">
        <CircularProgress />
    </div>
    return (
        <Container className="md:p-3 lg:p-4">
            <div className="p-4 flex flex-col gap-4">
                <div className="flex flex-col lg:flex-row sm:p-3 md:p-8 gap-10 lg:gap-7">
                    <Image 
                    src={game!.background_image} 
                    alt="Game image"
                    width={1200}
                    height={800}
                    quality={100}
                    className="lg:w-[60%] h-full"/>
                    <p className="text-xl text-balance text-justify lg:w-[40%]">{game?.description}</p>
                </div>
            </div>
        </Container>
    )
}