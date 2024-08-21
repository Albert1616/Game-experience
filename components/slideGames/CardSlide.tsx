import { Game } from '@/utils/types'
import { Rating } from '@mui/material'
import React from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useRouter } from 'next/navigation';

interface PropsCard extends Game{
    type:string
}

function CardSlide({...props} : PropsCard) {
  const route = useRouter();
  
  const openDetails = (id:number) => {
    route.push(`/game/${id}`);
  }

  return (
    <div className='rounded-lg w-full h-[20em] sm:h-[25em] bg-center bg-cover cursor-pointer'
    style={{
        backgroundImage: `url(${props.background_image})`,
    }} onClick={() => openDetails(props.id)}>
        <div className='h-full w-full p-3 bg-gradient-to-b from-transparent to-black/70 flex flex-col gap-4 justify-end items-center'>
            <h1 className='text-2xl sm:text-xl text-center font-extrabold'>{props.name}</h1>
            {props.type === 'rating' &&
                <div className='flex flex-col items-center gap-2'>
                    <Rating value={props.rating} icon={<StarIcon/>} 
                    emptyIcon={<StarBorderIcon sx={{color:'white'}}/>} precision={0.5} size='small' readOnly/>
                    <h3 className='font-extrabold'>{props.rating}/5</h3>
                </div>
            }
            {props.type === 'released' &&
                <ul className='flex flex-wrap gap-2'>
                    {props.tags!.map((tag, index) => (
                        index <= 5 && <li key={tag.id} 
                        className='text-sm rounded-lg bg-gray-400 text-black py-[2px] px-1'>{tag.name}</li>
                    ))}
                </ul>
            }
            
        </div>
        </div>
  )
}

export default CardSlide