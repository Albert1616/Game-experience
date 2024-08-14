'use client'

import { useEffect, useState } from "react";

let BASE_URL:string = 'https://api.rawg.io/api';

const API_KEY:string = '51ec38f0feb7474ab43e6e64b55e387a';

interface GameTabs{
    id:number,
    name:string,
    url:string,
    rating:number,
    genres:string[]
}

export default function Home() {
  const [data, setData] = useState<GameTabs[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [games, setGames] = useState<GameTabs[]>([]);

  useEffect(() => {
      fetch(`${BASE_URL}/games?key=${API_KEY}`, {
          method: 'GET',
          headers: { 'Content-Type': 'Application/json' },
      })
      .then((response) => response.json())
      .then((data) => {
          setData(data.results || []); // Ajuste de acordo com a estrutura real da resposta
          setLoading(false);
      })
      .catch((e) => {
          console.error(e);
          setError('Failed to fetch games');
          setLoading(false);
      });

      if(data.length > 0){
        data.map((item) => {
          setGames({
            id: item.id,
            name: item.name,
            url: item.url,
            rating: item.rating,
            genres: item.genres.map((genrer) => {return genrer.name})
          })
        })
      }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
      <main className="w-full h-full pt-5 px-10">
          <p>home</p>
          <ul>
              {data.map(game => (
                  <li key={games[0].id}>{games[0].name}</li>
              ))}
          </ul>
      </main>
  );
}