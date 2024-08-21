'use client'

import Container from "@/components/Container";
import GamesYear from "@/components/gameYear/GamesYear";
import SlideGames from "@/components/slideGames/SlideGames";
import { ApiResponse, Game } from "@/utils/types";
import { API_KEY, BASE_URL } from "@/utils/utils";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
export default function Home() {
  const [gameReleased,setGameReleased] = useState<Game[]>();
  const [gameRating, setGameRating] = useState<Game[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${BASE_URL}/games?ordering=-released&key=${API_KEY}`)
    .then((response) => response.json())
    .then((data:ApiResponse) => setGameReleased(data.results))

    fetch(`${BASE_URL}/games?ordering=-rating&key=${API_KEY}`)
    .then((response) => response.json())
    .then((data:ApiResponse) => {
      setGameRating(data.results);
      setLoading(false)
    })
  },[])
  if(loading) return <div className="h-full w-full"><CircularProgress /></div>
  return (
      <Container>
          <GamesYear/>
          <div className="h-full w-full flex flex-col pt-[10rem] sm:pt-[2rem] gap-16 sm:gap-32">
            <SlideGames title="Lançamentos" games={gameReleased!} type="released"/>
            <SlideGames title="Favoritos dos gamers" games={gameRating!} type="rating"/>
          </div>
      </Container>
  );
}