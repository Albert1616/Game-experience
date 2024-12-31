import { Game } from '@/utils/types'
import { CircularProgress } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import { easeIn, motion } from 'framer-motion'

type Props = {
    game: Game
}

const CardRandomGame = ({ game }: Props) => {
    const [loading, setLoading] = useState(true)

    const handleImageLoad = () => {
        setLoading(false)
    }

    return (
        <div
            className='w-full h-full flex flex-col gap-2'>
            {loading && (
                <div className="flex justify-center items-center w-full h-full">
                    <CircularProgress />
                </div>
            )}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeIn", duration: 0.5, delay: 1 }}
                className='max-h-full'>
                <Image
                    src={game.background_image}
                    alt='Banner game'
                    height={300}
                    width={300}
                    className='w-full h-full rounded-md'
                    onLoadingComplete={handleImageLoad}
                />
            </motion.div>
            <h1 className='text-black dark:text-white text-lg md:text-xl font-bold text-center'>{game.name}</h1>
        </div>
    )
}

export default CardRandomGame
