'use client'

import Container from '@/components/Container';
import { ApiResponse, Game } from '@/utils/types'
import { API_KEY, BASE_URL } from '@/utils/utils';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface PageProps{
    params:{
        param:string
    }
}

export default function SearchPage({params} : PageProps){
    const [results, setResults] = useState<Game[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const route = useRouter();

    console.log(params.param);

    const createCard = (game: Game) =>{
        return <div className='rounded-md bg-cover bg-center bg-no-repeat cursor-pointer h-full'
        style={{backgroundImage:`url(${game.background_image})`}}
        onClick={() => route.push(`/game/${game.id}`)}>
            <div className='w-full h-[20em] flex flex-col items-center justify-end p-4 
            rounded-md bg-gradient-to-b from-transparent to-black/50 border border-white'>
                <h1>{game.name}</h1>
            </div>
        </div>
    }

    useEffect(() => {
        fetch(`${BASE_URL}/games?search=${params.param}&key=${API_KEY}`)
        .then((response) => response.json())
        .then((data:ApiResponse) => {
            setResults(data.results)
            setIsLoading(false);
        })
    }, [params.param])

    if(isLoading) return <div className='w-full h-full flex mx-auto'><CircularProgress /></div>
    if(results!.length === 0) return <div className='w-full h-full flex mx-auto'><h1>Nenhum resultado encontrado!</h1></div>
    return <Container className='pt-10'>
        <div className='w-full h-full grid grid-cols-5 gap-5'>
            {results!.map((game) => createCard(game))}
        </div>
    </Container>
}