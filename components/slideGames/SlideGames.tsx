'use client'

import { Game } from '@/utils/types'
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

interface PropsSlide{
    title:string,
    games:Game[],
    type:string
}

function SlideGames({...props} : PropsSlide) {
  return (
    <div className='w-full flex flex-col gap-5'>
        <h1 className='text-xl font-bold leading-tight'>
            <Link href='/' className='relative flex gap-2'>{props.title + " >"}</Link>
        </h1>
        <div className='relative z-0'>
            <Carousel className='h-[20em]' opts={{loop:true}}>
                <CarouselContent className='h-full p-4'>
                    {props.games.map((game) => (
                        <CarouselItem key={game.id} className='sm:basis-1/2 lg:basis-1/3 h-full'>
                            <CardSlide {...game} type={props.type}/>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext className='hidden md:flex'/>
                <CarouselPrevious className='hidden md:flex'/>
            </Carousel>
        </div>
    </div>
  )
}

export default SlideGames