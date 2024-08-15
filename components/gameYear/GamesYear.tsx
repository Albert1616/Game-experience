import React, { useEffect, useState } from 'react'
import GeneralGame from './GeneralGame'
import { ApiResponse, Game } from '@/utils/types';

let BASE_URL:string = 'https://api.rawg.io/api';

const API_KEY:string = '51ec38f0feb7474ab43e6e64b55e387a';

function GamesYear() {
  const [data, setData] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      fetch(`${BASE_URL}/games?key=${API_KEY}`, {
          method: 'GET',
          headers: { 'Content-Type': 'Application/json' },
      })
      .then((response) => response.json())
      .then((data: ApiResponse) => {
          setData(data.results || []); // Ajuste de acordo com a estrutura real da resposta
          setLoading(false);
      })
      .catch((e) => {
          console.error(e);
          setError('Failed to fetch games');
          setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className='w-full h-full grid grid-rows-3 gap-2'>
      <GeneralGame {...data[0]}/>
      <div className='grid grid-cols-5 gap-3 text-center row-span-1'>
        <div className="bg-red-500">teste</div>
        <div className="bg-red-500">teste</div>
        <div className="bg-red-500">teste</div>
        <div className="bg-red-500">teste</div>
        <div className="bg-red-500">teste</div>
      </div>
    </div>
  )
}

export default GamesYear