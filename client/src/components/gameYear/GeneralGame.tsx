import { Game } from "@/src/utils/types";
import Image from "next/image";
import Tag from "../Tag";
import Platform from "../Platform";
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from "../ui/button";

interface props {
  game: Game;
}

function GeneralGame({ game }: props) {
  return (
    <AnimatePresence key={game.id} mode="wait">
      <motion.div
        initial={{ x: 70, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5, delay: 0.1 }}
        className='rounded-xl
      col-span-5 max-w-full cursor-pointer h-[20em] md:h-full relative'>
        <Image
          src={game.background_image != "" ? game.background_image : "/game_not_image.jpg"}
          alt="Game banner"
          height={1200}
          width={1500}
          className="w-full h-full" />
        <div className="absolute w-full h-full inset-0 bg-gradient-to-t to-transparent from-black flex flex-col xl:gap-4 justify-end items-start p-5">
          <h1 className="text-xl md:text-4xl lg:text-5xl font-extrabold">{game.name}</h1>
          <div className="flex flex-wrap items-center gap-2 md:gap-10">
            <div className="flex flex-wrap items-center gap-2">
              {game.genres.map((genre, index) => <Tag key={index} tag={genre.name} />)}
            </div>
            <div className="flex items-center gap-4">
              {game.parent_platforms.map((parent, index) => <Platform key={index} platform={parent.platform.slug} />)}
            </div>
          </div>
          <Button className="hidden md:flex py-6 bg-englishViolet hover:text-black 
          hover:bg-primaryDark dark:hover:bg-primaryDark 
          text-lg mt-6 w-[12em] transition-colors duration-500">
            Veja mais
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default GeneralGame