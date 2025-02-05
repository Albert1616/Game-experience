import { Skeleton } from '@mui/material'
import React from 'react'

const GamesIsLoading = () => {
    return (
        <div className='mt-28 h-full md:h-screen w-full md:grid grid-cols-6 gap-2'>
            <div className='
        col-span-5 h-[20em] md:h-full'>
                <Skeleton width="100%" height="100%" variant='rectangular' />
            </div>
            <div className='hidden col-span-1 h-full md:flex flex-col justify-between gap-3'>
                <Skeleton width="100%" height="20%" variant='rectangular' />
                <Skeleton width="100%" height="20%" variant='rectangular' />
                <Skeleton width="100%" height="20%" variant='rectangular' />
                <Skeleton width="100%" height="20%" variant='rectangular' />
                <Skeleton width="100%" height="20%" variant='rectangular' />
            </div>
        </div>
    )
}

export default GamesIsLoading