'use client'

import Image from 'next/image'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useGetGameByIdQuery } from '@/src/services/api';
import { CircularProgress, Rating } from '@mui/material';
import { StarIcon } from 'lucide-react';
import React, { useState } from 'react'
import { FaWindows, FaPlaystation, FaXbox, FaAndroid, FaApple } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type Props = {
    id: string
}

const Game = ({ id }: Props) => {
    const { data: game, isLoading, isError } = useGetGameByIdQuery(id)

    const [seeMore, setSeeMore] = useState<boolean>(false);
    const Tag = (name: string) => {
        return <div className="py-1 px-2 bg-gray-600/40 rounded-lg">{name}</div>
    }

    const PlatformIcon = (platform: string) => {
        let name: string = platform.toLowerCase();
        if (name.includes("pc")) {
            return <FaWindows size={30} />
        } else if (name.includes("playstation")) {
            return <FaPlaystation size={30} />
        } else if (name.includes("xbox")) {
            return <FaXbox size={30} />
        } else if (name.includes("mobile") || name.includes("android")) {
            return <FaAndroid size={30} />
        } else if (name.includes("apple")) {
            return <FaApple size={30} />
        } else {
            return;
        }
    }

    if (isLoading) return
    <div className="w-full h-full flex items-center justify-center">
        <CircularProgress />
    </div>

    if (isError) return <p>Error</p>
    return (
        <div className="h-screen bg-background dark:bg-primaryGray text-black dark:text-white">
            <div className='w-full h-[90%] relative'>
                <div className='absolute w-full h-full top-0 left-0 bg-gradient-to-b from-transparent to-black/90' />
                <Image
                    src={game!.background_image}
                    alt="Game image"
                    width={1200}
                    height={800}
                    quality={100}
                    priority
                    className="bg-cover bg-center bg-fixed w-full max-h-full select-none" />
                <div className='absolute w-full top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
                    <h1 className="text-7xl text-white font-extrabold text-center">{game!.name}</h1>
                    <div className='flex items-center justify-center gap-1'>
                        <Rating value={game && game!.rating} icon={<StarIcon />}
                            emptyIcon={<StarBorderIcon sx={{ color: "white" }} />} precision={0.5} size='small' readOnly />
                        <p className='text-white'>{game && game!.rating}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-3 items-center mt-6 pl-3">
                {game!.parent_platforms && game!.parent_platforms.map((data, index) => (
                    <div key={index}>
                        {PlatformIcon(data.platform.name)}
                    </div>
                ))}
            </div>
            <div className='mt-3 p-3 gap-6'>
                <div className='flex flex-col gap-3 py-6'>
                    <h2 className='text-black dark:text-white text-3xl font-bold'>Sobre este jogo</h2>
                    <div className={`relative ${seeMore ? "overflow-auto" : "overflow-hidden"}`}>
                        <p className={`text-sm md:text-[20px] text-pretty text-justify leading-tight font-medium
                            ${seeMore ? "" : "max-h-[200px]"}`
                        }>
                            {game!.description_raw}
                        </p>
                        {!seeMore && game?.description_raw && game.description_raw.length > 200 && (
                            <div className='absolute bottom-0 w-full border-none bg-gradient-to-b from-transparent to-white h-2/5' />
                        )}
                    </div>
                    {game?.description_raw && game.description_raw.length > 200 && (

                        <p className='bg-transparent hover:bg-transparent hover:underline shadow-none text-xl text-left font-bold text-red-500
                    cursor-pointer flex items-center gap-1'
                            onClick={() => setSeeMore(!seeMore)}>
                            {seeMore ? `Veja menos` : `Veja mais`}
                            <span>
                                {seeMore ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </span>
                        </p>
                    )}
                </div>
                {game?.genres && game!.genres.length > 0 && (
                    <div className="flex flex-col gap-1">
                        <h2 className='text-black dark:text-white text-3xl font-bold'>Gêneros</h2>                            <div className="flex gap-1 items-center">
                            {game?.genres && game.genres && game!.genres.map((genre, index) => (
                                <div key={index}>{Tag(genre.name)}</div>
                            ))}
                        </div>
                    </div>
                )}
                {game?.tags && game.tags.length > 0 && (
                    <div className="flex flex-col gap-1 mt-6">
                        <h2 className='text-black dark:text-white text-3xl font-bold'>Tags</h2>                            <div className="flex flex-wrap gap-1">
                            {game?.tags && game.tags.length > 0 ? game!.tags.map((tag, index) => (
                                <div key={index}>
                                    {Tag(tag.name)}
                                </div>

                            )) : <p className="text-xl font-bold">-</p>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Game