'use client'

import React, { useEffect, useState } from 'react'
import GeneralGame from './GeneralGame'
import { ApiResponse, Game } from '@/utils/types';
import GameCard from './GameCard';
import { API_KEY, BASE_URL } from '@/utils/utils';
import { CircularProgress } from '@mui/material';


function GamesYear() {
  const [data, setData] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [gameId, setGameId] = useState<number>(0);

  useEffect(() => {
      fetch(`${BASE_URL}/games?key=${API_KEY}`, {
          method: 'GET',
          headers: { 'Content-Type': 'Application/json' },
      })
      .then((response) => response.json())
      .then((data: ApiResponse) => {
          setData(data.results.slice(0,5) || []); // Ajuste de acordo com a estrutura real da resposta
          setLoading(false);
          if(gameId === 0){
            setGameId(data.results[0].id);
          }
      })
      .catch((e) => {
          console.error(e);
          setError('Failed to fetch games');
          setLoading(false);
      });
  }, []);

  const changeGeneral = (id:number) =>{
    setGameId(id);
  }

  if(loading) return <div className="container flex flex-col items-center justify-center"><CircularProgress/></div>
  if (error) return <p>{error}</p>;
  return (
    <div className='w-full h-full grid grid-rows-4 gap-2'>
      <GeneralGame id={gameId}/>
      <div className='h-full flex flex-col sm:grid sm:grid-cols-5 gap-3 text-center row-span-1'>
        {data.map((game) => (
          <GameCard {...game} isSelected={gameId === game.id ? true : false} key={game.id}
        onChange={changeGeneral}/>
        ))}
      </div>
    </div>
  )
}

export default GamesYear