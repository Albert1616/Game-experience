'use client'

import { useEffect, useState } from 'react'
import GeneralGame from './GeneralGame'
import GameCard from './GameCard';
import { CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { GetGames } from '@/app/api/actions';
import { Game } from '@/utils/types';

export const GamesYear = () => {
  const { data: games, isLoading, isError } = useQuery({
    queryKey: ['games_list'],
    queryFn: GetGames
  })
  const [gameGeneral, setGameGeneral] = useState<Game>({
    id: 0,
    description: '',
    name: '',
    background_image: '',
    rating: 0,
    genres: [],
    parent_platforms: [],
    tags: [],
  });

  useEffect(() => {
    if (!isLoading && games) {
      setGameGeneral(games[0])
    }
  }, [games, isLoading])

  const changeGeneral = (game: Game) => {
    setGameGeneral(game);
  }
  if (isLoading) return <div className="container flex flex-col items-center justify-center"><CircularProgress /></div>
  if (isError) return <p>Error to retriving games</p>;
  return (
    <div className='mt-28 h-[30em] w-full grid grid-cols-6 gap-2'>
      <GeneralGame game={gameGeneral!} />
      <div className='h-full flex flex-col gap-3 text-center col-span-1'>
        {games && games.map((game, index) => (
          index < 5 ? (
            <GameCard {...game} isSelected={gameGeneral!.id === game.id ? true : false} key={game.id}
              onChange={changeGeneral} />
          ) : null
        ))}
      </div>
    </div>
  )
}