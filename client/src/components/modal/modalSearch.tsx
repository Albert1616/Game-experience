import React from 'react'
import { Input } from '../ui/input'

function modalSearch() {
  return (
    <div className='w-screen h-screen relative bg-black/50 flex flex-col
    p-5'>
        <Input placeholder='Pesquisar games...' className='w-full rounded-lg'/>
    </div>
  )
}

export default modalSearch