import { Game } from "@/utils/types";
import { API_KEY, BASE_URL } from "@/utils/utils";
import { useEffect, useState } from "react";

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
        setDescription(desc);  
      })
      .catch((error) => console.log(error))
      
  }, [id])
  if(isloading) return <p>Loading...</p>
  if(game === null || game === undefined) return <p>Game inválido</p>

  
  return (
    <div className='w-full bg-cover bg-no-repeat  rounded-xl
     row-span-3 flex items-end rounded-xl'
    style={{
        backgroundImage: `url(${game.background_image})`,
    }}>
        <div className="bg-black/40 h-full rounded-lg flex flex-col justify-end p-5 cursor-pointer transition ease-in delay-250
         hover:bg-black/35 duration-300">
            <h1 className="text-6xl font-extrabold text-right">{game.name}</h1>
            <p className="text-balance text-base font-extrabold text-xl text-justify">{description}</p>   
        </div>
    </div>
  )
}

export default GeneralGame