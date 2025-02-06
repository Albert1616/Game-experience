import { Game } from '@/src/utils/types'
import React, { useEffect, useState } from 'react'
import CardRandomGame from './CardRandomGame'
import { useGetGamesByGenreQuery } from '@/src/services/api'
import { CircularProgress } from '@mui/material'

type props = {
    genre: string
}

const RandomGame = ({ genre }: props) => {
    const [game, setGame] = useState<Game>({
        id: "0",
        description_raw: '',
        name: '',
        background_image: '',
        rating: 0,
        genres: [],
        parent_platforms: [],
        tags: [],
    })

    const { data: games, isLoading } = useGetGamesByGenreQuery(genre);
    
    useEffect(() => {
        if (!isLoading && games && games.length > 0) {
            let indexCurrent = Math.floor(Math.random() * games.length);
            while (!games[indexCurrent]?.background_image) {
                indexCurrent = (indexCurrent + 1) % games.length;
            }
            setGame(games[indexCurrent]);
        }
    }, [games, isLoading, genre]);
    
    if (isLoading) return <div className='w-full h-full flex items-center justify-center'><CircularProgress size={60}/></div>
    return (
        <div className='w-full h-full'>
            <CardRandomGame game={game} />
        </div>
    )
}

export default RandomGame
