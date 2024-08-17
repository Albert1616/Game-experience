import { Game } from "@/utils/types";
import { API_KEY, BASE_URL } from "@/utils/utils";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

interface GeneralGame extends Game{
    description: string
}

interface props{
    id:number;
}

function GeneralGame({id}:props) {
  const [game, setGame] = useState<GeneralGame>();
  const [isloading, setIsLoading] = useState<boolean>(true);
  const[description, setDescription] = useState<string>();

  useEffect(() => {
    console.log(`ID DO GAME: ${id}`);
    fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`,{
        method:"GET",
        headers:{"Content-type": "Application-json"}
    }).then((response) => response.json())
      .then((data: GeneralGame) => {
        setGame(data)
        setIsLoading(false);
        let desc = data.description
            .replaceAll("<p/>", "")
            .replaceAll("<p>", "")
            .replaceAll("</p>", "")
            .replaceAll("<br />", "");
        let index = desc.indexOf("Español");
        desc = index !== -1 ? desc.substring(0,index) : desc;
        if(desc.length > 600){
          desc = desc.slice(0,600) + ".";
        }
        setDescription(desc);  
      })
      .catch((error) => console.log(error))
      
  }, [id])
  if(isloading) return <div className="flex mx-auto"><CircularProgress/></div>
  if(game === null || game === undefined) return <p>Game inválido</p>

  
  return (
    <div className='w-full max-h-full bg-cover bg-center bg-no-repeat  rounded-xl
     row-span-3 flex items-end'
    style={{
        backgroundImage: `url(${game.background_image})`,
    }}>
        <div className="bg-black/40 h-full w-full rounded-lg flex flex-col justify-end p-5 cursor-pointer transition ease-in delay-250
         hover:bg-black/35 duration-300">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-center sm:text-right">{game.name}</h1>
            <p className="hidden md:flex text-balance font-extrabold text-xl text-justify">{description}</p>   
        </div>
    </div>
  )
}

export default GeneralGame