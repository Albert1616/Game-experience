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

function SlideGames({ ...props }: PropsSlide) {
    const { data: games, isLoading, isError } = useQuery({
        queryKey: ["gamesSlider"],
        queryFn: props.type === typesGames.LATEST ? GetLatestGames : GetRatingGames
    })

    if (isLoading || !games) return <div className='w-full h-full flex items-center justify-center'>
        <CircularProgress />
    </div>

    if (isError) return <div className='w-full h-full flex items-center justify-center'>Errot to retriving games</div>
    return (
        <div className='w-full flex flex-col gap-5'>
            <h1 className='text-xl font-bold leading-tight'>
                <Link href='/' className='relative flex gap-2'>{props.title + " >"}</Link>
            </h1>
            <div className='relative z-0'>
                <Carousel className='h-[20em]' opts={{ loop: true }}>
                    <CarouselContent className='h-full p-4'>
                        {games.map((game, index) => (
                            index < 10 && game.background_image ? (<CarouselItem key={game.id} className='sm:basis-1/2 lg:basis-1/3 h-full'>
                                <CardSlide {...game} type={props.type} />
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