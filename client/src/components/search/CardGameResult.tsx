'use client'

import { Game } from '@/src/utils/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  game: Game
}

const CardGameResult = ({ game }: Props) => {

  const route = useRouter();
  return (
    <div
      className='flex items-center px-3 py-2 gap-3 h-fit mt-3 hover:bg-gray-700 hover:cursor-pointer'
      onClick={() => route.push(`/game/${game.id}`)}>
      <div className='w-[5em] h-[5em] rounded-lg mt-3'>
        <Image
          src={game.background_image != "" ? game.background_image : "/game_not_image.jpg"}
          alt='Card de resultado para a busca de games'
          width={80}
          height={80}
          className='rounded-lg h-full w-full' />
      </div>

      <h3 className='text-white text-xl font-bold'>{game.name}</h3>
    </div>
  )
}

export default CardGameResult