import React, { useState } from 'react'
import { Input } from '../ui/input'
import { useSearchGamesQuery } from '@/services/api';
import CardGameResult from './CardGameResult';

const SearchComponent = () => {
    const [search, setSearch] = useState("");

    const handleChangeSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearch(query);
    }

    const {data:games, isLoading, isError} = useSearchGamesQuery(search);
  return (
    <div className='flex flex-col items-center mt-12 px-10'>
        <Input
        value={search}
        onChange={handleChangeSearch}
        className='bg-transparent border-0 border-b border-b-white 
        text-white text-2xl text-left px-0 rounded-sm focus:outline-none outline-none w-full' 
        placeholder='Buscar...'/>
        {search != "" && games && games.length > 0 && (
            <div className='bg-transparente w-full grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[28em]
            overflow-y-auto'>
                {games.map((game) => (
                    <CardGameResult game={game} />
                ))}
            </div>
        )}
    </div>
  )
}

export default SearchComponent