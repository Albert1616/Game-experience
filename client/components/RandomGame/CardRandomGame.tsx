import { Game } from '@/utils/types'
import Image from 'next/image'
import { motion } from 'framer-motion'

type Props = {
    game: Game
}

const CardRandomGame = ({ game }: Props) => {
    return (
        <div
            className='h-[20em] flex flex-col gap-2'>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeIn", duration: 0.5, delay: 1 }}
                className='h-full'>
                <Image
                    src={game.background_image}
                    alt='Banner game'
                    height={300}
                    width={300}
                    className='rounded-md w-full h-full'
                />
            </motion.div>
            <h1 className='text-black dark:text-white text-lg md:text-xl font-bold text-center'>{game.name}</h1>
        </div>
    )
}

export default CardRandomGame
