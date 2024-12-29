import { GameComplete } from "@/utils/types";
import { API_KEY, BASE_URL } from "@/utils/utils";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import Image from "next/image";

interface props {
  id: number;
}

function GeneralGame({ id }: props) {
  const [game, setGame] = useState<GameComplete>();
  const [isloading, setIsLoading] = useState<boolean>(true);
  const [description, setDescription] = useState<string>();

  useEffect(() => {
    console.log(`ID DO GAME: ${id}`);
    fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`, {
      method: "GET",
      headers: { "Content-type": "Application-json" }
    }).then((response) => response.json())
      .then((data: GameComplete) => {
        setGame(data)
        setIsLoading(false);
        let desc = data.description
          .replaceAll("<p/>", "")
          .replaceAll("<p>", "")
          .replaceAll("</p>", "")
          .replaceAll("<br />", "");
        let index = desc.indexOf("Español");
        desc = index !== -1 ? desc.substring(0, index) : desc;
        if (desc.length > 600) {
          desc = desc.slice(0, 600) + ".";
        }
        setDescription(desc);
      })
      .catch((error) => console.log(error))

  }, [id])
  if (isloading) return <div className="flex mx-auto"><CircularProgress /></div>
  if (game === null || game === undefined) return <p>Game inválido</p>


  return (
    <div className='rounded-xl
     row-span-4 max-w-full max-h-full relative'>
      <Image
        src={game.background_image}
        alt="Game banner"
        height={1200}
        width={1500}
        className="w-full h-full" />
      <div className="absolute w-full h-full inset-0 bg-gradient-to-t to-transparent from-black flex flex-col justify-end p-5">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-center sm:text-right">{game.name}</h1>
        <p className="hidden md:flex text-balance font-extrabold text-lg text-justify">{description}</p>
      </div>
    </div>
  )
}

export default GeneralGame