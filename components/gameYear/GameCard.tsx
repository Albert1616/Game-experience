import { Game } from '@/utils/types'
import React from 'react'

interface GameTabs extends Game{
    isSelected: boolean,
    onChange:(id:number) => void
}

function GameCard({...props}:GameTabs) {
  return (
    <div className='rounded-md h-[80%] w-full flex items-end bg-cover'
    style={{
        backgroundImage: `url(${props.background_image})`,
    }}>
        <div className='w-full h-full bg-black/50 flex flex-col justify-end p-3 cursor-pointer'
        onClick={() => props.onChange(props.id)}>
            <h1>{props.name}</h1>
        </div>
    </div>
  )
}

export default GameCard;