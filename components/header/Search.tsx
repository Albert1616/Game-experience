'use client'

import React, { ChangeEvent, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Input } from '../ui/input'
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

function Search() {
  const [text, setText] = useState<string>('');
  const route = useRouter();

  const handleTextInput = (event:ChangeEvent<HTMLInputElement>) =>{
    setText(event.target.value);
  }

  const search = () => {
    //console.log(textFilter);
    route.push(`/search/${text}`);
  }

  const onKeyBoard = (event:React.KeyboardEvent<HTMLInputElement>) =>{
    if(event.key === 'Enter'){
        event.preventDefault();
        search();
    }
  }
  return (
    <div className='flex items-center rounded-lg bg-gray-600 px-2'>
        <FaSearch className='bg-gray-600 rounded-lg'/>
        <Input onChange={handleTextInput} onKeyDown={onKeyBoard}
        className='w-full rounded-lg border-none focus:outline-none focus:border-transparent'/>
    </div>
  )
}

export default Search