'use client'

import CardGameResult from '@/components/search/CardGameResult'
import { useSearchGamesQuery } from '@/services/api'
import { CircularProgress } from '@mui/material'
import React from 'react'

type Props = {
  keypass: string
}

const SearchGamesResult = ({ keypass }: Props) => {
  const { data: games, isLoading, isError } = useSearchGamesQuery(keypass)

  if (isLoading) return <div className='w-full h-full flex flex-col justify-center'>
    <CircularProgress size={45} />
  </div>

  return (
    <div className='grid grid-cols-4 gap-3 mt-20'>
      {games && games.map((game) => (
        <CardGameResult key={game.id} game={game} />
      ))}
    </div>
  )
}

export default SearchGamesResult