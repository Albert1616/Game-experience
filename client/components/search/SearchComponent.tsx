import React, { useState } from 'react'
import { Input } from '../ui/input'
import { useSearchGamesQuery } from '@/services/api';
import CardGameResult from './CardGameResult';
import { CircularProgress } from '@mui/material';

const SearchComponent = () => {
    const [search, setSearch] = useState<String>(" ");

    const handleChangeSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearch(query);
    }

    const {data:games, isLoading, isError} = useSearchGamesQuery(search);
  return (
    <div className='flex flex-col items-center mt-12 px-10'>
        <Input
        onChange={handleChangeSearch}
        className='bg-transparent border-0 border-b border-b-white 
        text-white text-3xl text-left px-0 h-fit rounded-sm focus:outline-none outline-none w-full' 
        placeholder='Buscar...'/>
        {isLoading && <CircularProgress />}
        
        {!isLoading && search != " " && games && games.length > 0 && (
            <div className='bg-transparente w-full grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[28em]
            2xl:max-h-[40em] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-600'>
                {games.map((game) => (
                    <CardGameResult game={game} key={game.id}/>
                ))}
            </div>
        )}
    </div>
  )
}

export default SearchComponent