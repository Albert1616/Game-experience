import { Game } from "@/utils/types";
import Image from "next/image";

interface props {
  game: Game;
}

function GeneralGame({ game }: props) {
  console.log(`GAME GENERAL: ${game}`);
  return (
    <div className='rounded-xl
     col-span-5 max-w-full max-h-full relative'>
      <Image
        src={game.background_image}
        alt="Game banner"
        height={1200}
        width={1500}
        className="w-full h-full" />
      <div className="absolute w-full h-full inset-0 bg-gradient-to-t to-transparent from-black flex flex-col justify-end p-5">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-center sm:text-right">{game.name}</h1>
        <p className="hidden md:flex text-balance font-extrabold text-lg text-justify">{game.description}</p>
      </div>
    </div>
  )
}

export default GeneralGame