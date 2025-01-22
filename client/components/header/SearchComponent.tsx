import React, { useState } from 'react'
import { Input } from '../ui/input'
import { useSearchGamesQuery } from '@/services/api';

const SearchComponent = () => {
    const [search, setSearch] = useState("");

    const handleChangeSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearch(query);
    }

    const {data:games, isLoading, isError} = useSearchGamesQuery(search);
  return (
    <div className='absolute inset-0 top-0 right-0 z-90 w-screen h-screen bg-black/30'>
        <Input className='bg-white text-black text-lg rounded-sm' />
        {search != "" && games && games.length > 0 && (
            <div className='bg-white'>
                {games.map((game) => (
                    <h2>{game.name}</h2>
                ))}
            </div>
        )}
    </div>
  )
}

export default SearchComponent