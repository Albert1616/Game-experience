'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useVerifyEmailMutation } from '@/services/user'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface propsVerifyEmail{
  params:{
    email:string
  }
}

const VerifyEmail = ({params}:propsVerifyEmail) => {
  const [numbers, setNumbers] = useState({
    n1: '',
    n2: '',
    n3: '',
    n4: '',
  })

  const handleChangeCode = (e:React.ChangeEvent<HTMLInputElement>, index:number) => {
    const value = e.target.value;
    setNumbers(prevState => {
      const newNumbers = {...prevState};
      newNumbers[`n${index}`] = value;
      return newNumbers;
    })
  }
  return (
    <div className='h-screen bg-primaryWhite flex flex-col items-center justify-center gap-40'>
      <div className='text-center'>
      <h2 className='text-black text-4xl font-bold'>Confirme sua conta</h2>
      <p className='text-black text-lg'>Digite o código enviado para email de cadastro e confirme sua conta.</p>
      </div>
        <form className='flex flex-col items-center space-y-20 w-3/4'>
          <div className='flex items-center gap-10 '>
            <Input className='border-0 rounded-none border-b-[1px] shadow-none border-b-black 
            bg-transparent text-black outline-none text-5xl text-center h-full' onChange={(e) => setNumbers({n1: e.target.value, ...numbers})} maxLength={1}/>
            <Input className='border-0 rounded-none border-b-[1px] shadow-none border-b-black 
            bg-transparent text-black outline-none text-5xl text-center h-full' maxLength={1}/>
            <Input className='border-0 rounded-none border-b-[1px] shadow-none border-b-black 
            bg-transparent text-black outline-none text-5xl text-center h-full' maxLength={1}/>
            <Input className='border-0 rounded-none border-b-[1px] shadow-none border-b-black 
            bg-transparent text-black outline-none text-5xl text-center h-full' maxLength={1}/>        
          </div>
          <Button type='submit' className='text-center w-1/2 p-2 text-lg'>Confirmar conta</Button>
        </form>
    </div>
  )
}

export default VerifyEmail