import { Game } from '@/utils/types';
import React from 'react';
import {Rating} from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { purple } from '@mui/material/colors';
interface GameTabs extends Game{
    isSelected: boolean,
    onChange:(id:number) => void
}

function GameCard({...props}:GameTabs) {
  return (
    <div className='rounded-md h-[80%] w-full flex items-end bg-cover sm:bg-center'
    style={{
        backgroundImage: `url(${props.background_image})`,
    }}>
        <div className='w-full h-full bg-black/50 flex flex-col items-center sm:justify-end p-3 cursor-pointer'
        onClick={() => props.onChange(props.id)}>
            <h1 className='text-sm lg:text-lg'>{props.name}</h1>
            <Rating value={props.rating} icon={<StarIcon/>} 
            emptyIcon={<StarBorderIcon sx={{color:'white'}}/>} precision={0.5} size='small' readOnly/>
        </div>
    </div>
  )
}

export default GameCard;