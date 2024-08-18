import { Game } from '@/utils/types';
import React, { ReactNode } from 'react';

interface GameTabs extends Game{
    isSelected?: boolean,
    onChange?:(id:number) => void,
}

function GameCard({...props}:GameTabs) {
  return (
    <div className='rounded-lg h-[80%] w-full flex items-end bg-cover sm:bg-center'
    style={{
        backgroundImage: `url(${props.background_image})`,
    }}>
        <div className={`w-full h-full bg-black/50 flex flex-col 
        items-center sm:justify-end p-3 cursor-pointer rounded-lg 
        ${props.isSelected && 'border border-white bg-black/30'}`}
        onClick={() => props.onChange!(props.id)}>
            <h1 className='text-sm lg:text-lg'>{props.name}</h1>
            
        </div>
    </div>
  )
}

export default GameCard;