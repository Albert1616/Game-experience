'use client'

import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import CardSlide from './CardSlide'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { GetLatestGames, GetRatingGames } from '@/app/api/actions'
import { CircularProgress } from '@mui/material'
import { typesGames } from '@/utils/types'

interface PropsSlide {
    title: string,
    type: typesGames
}

function SlideGames({ title, type }: PropsSlide) {
    const { data: games, isLoading, isError } = useQuery({
        queryKey: ["gamesSlider", type],
        queryFn: type === "latest" ? GetLatestGames : GetRatingGames
    })

    if (isLoading || !games) return <div className='w-full h-full flex items-center justify-center'>
        <CircularProgress />
    </div>

    if (isError) return <div className='w-full h-full flex items-center justify-center'>Errot to retriving games</div>
    return (
        <div className='w-full mt-8'>
            <h1 className='text-black dark:text-white text-xl font-bold leading-tight'>
                <Link href='/' className='relative flex gap-2'>{title + " >"}</Link>
            </h1>
            <div className='mt-2'>
                <Carousel className='' opts={{ loop: true }}>
                    <CarouselContent className=''>
                        {games.map((game, index) => (
                            index < 15 && game.background_image ? (<CarouselItem key={game.id} className='sm:basis-1/2 lg:basis-1/5 h-full'>
                                <CardSlide {...game} type={type} />
                            </CarouselItem>) : null
                        ))}
                    </CarouselContent>
                    <CarouselNext className='hidden md:flex' />
                    <CarouselPrevious className='hidden md:flex' />
                </Carousel>
            </div>
        </div>
    )
}

export default SlideGames