import { Game } from '@/utils/types'
import React, { useEffect, useState } from 'react'
import CardRandomGame from './CardRandomGame'
import { useGetGamesByGenreQuery } from '@/services/api'

type props = {
    genre: string
}

const RandomGame = ({ genre }: props) => {
    const [game, setGame] = useState<Game>({
        id: 0,
        description: '',
        name: '',
        background_image: '',
        rating: 0,
        genres: [],
        parent_platforms: [],
        tags: [],
    })

    const { data: games, isLoading, isError } = useGetGamesByGenreQuery(genre);

    console.log(games);
    console.log(genre);

    useEffect(() => {
        if (!isLoading && games && games.length > 0) {
            let indexCurrent = Math.floor(Math.random() * games.length);
            while (!games[indexCurrent]?.background_image) {
                indexCurrent = (indexCurrent + 1) % games.length;
            }
            setGame(games[indexCurrent]);
        }
    }, [games, isLoading, genre]);
    return (
        <div className='w-full h-full'>
            <CardRandomGame game={game} />
        </div>
    )
}

export default RandomGame
