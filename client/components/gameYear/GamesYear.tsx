'use client'

import { Suspense, useEffect, useState } from 'react'
import GeneralGame from './GeneralGame'
import GameCard from './GameCard';
import { CircularProgress } from '@mui/material';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useGetGamesQuery } from '@/services/api';
import { Game } from '@/utils/types';
import { Skeleton } from '../ui/skeleton';
import GamesIsLoading from './GamesIsLoading';

export const GamesYear = () => {
  const { data: games = [], isLoading, isError } = useGetGamesQuery();
  const [gameGeneral, setGameGeneral] = useState<Game>({
    id: 0,
    description_raw: '',
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
  //if (isLoading) return <div className="container flex flex-col items-center justify-center"><CircularProgress /></div>
  if (isError) return <p>Error to retriving games</p>;
  return (
    isLoading ? (
      <GamesIsLoading />
    ) : (
      <div>
        <div className='mt-28 h-full md:hidden'>
          <Carousel opts={{ loop: true }}>
            <CarouselContent className='h-full'>
              {games?.map((game: Game) => (
                <CarouselItem key={game.id}>
                  <GeneralGame game={game} />
                </CarouselItem>))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className='mt-28 h-full w-full hidden md:grid grid-cols-6 gap-2'>
          <GeneralGame game={gameGeneral!} />
          <div className='h-full flex flex-col gap-3 text-center col-span-1'>
            {games && games.map((game: Game, index: number) => (
              index < 5 ? (
                <GameCard {...game} isSelected={gameGeneral!.id === game.id ? true : false} key={game.id}
                  onChange={changeGeneral} />
              ) : null
            ))}
          </div>
        </div>
      </div >
    ))
}