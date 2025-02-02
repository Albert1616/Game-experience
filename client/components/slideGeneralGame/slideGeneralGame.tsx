import { useGetGamesQuery } from '@/services/api'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

const SlideGeneralGame = () => {
  const { data: games, isLoading, isError } = useGetGamesQuery()

  const [index, setIndex] = useState(1);

  const next = () => {
    if (index === games!.length) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  const previous = () => {
    if (index === 0) {
      setIndex(games!.length)
    } else {
      setIndex(index - 1);
    }
  }

  useEffect(() => {
    if (games && games.length > 0 && !isLoading) {
      setIndex(games![0].id)
    }
  }, [games, isLoading])

  return (
    <div className='bg-gray-500 h-[25em]'>
      <Carousel
        opts={{
          align: "center",
          loop: true
        }}
        className='w-full h-full'>
        <CarouselContent className='h-full'>
          {games?.map((game) => (
            <CarouselItem key={game.id} className='basis-1/3 h-[25em] p-0'>
              <Image
                src={game.background_image}
                alt='Game banner'
                width={400}
                height={400}
                quality={100}
                className='w-full h-full' />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default SlideGeneralGame