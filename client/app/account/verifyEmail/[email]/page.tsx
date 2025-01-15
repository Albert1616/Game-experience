'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useVerifyEmailMutation } from '@/services/user'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface propsVerifyEmail{
  params:{
    email:string
  }
}

const codeSchema = z.object({
  number1: z.number().max(1),
  number2: z.number().max(1),
  number3: z.number().max(1),
  number4: z.number().max(1)
})

type codeSchemaType = z.infer<typeof codeSchema>;

const VerifyEmail = ({params}:propsVerifyEmail) => {
  const {handleSubmit, register, formState={Error}} = useForm<codeSchemaType>({
    resolver: zodResolver(codeSchema)
  })

  const handleSubmitCode = async (data:codeSchemaType) => {
    try{
      const code = (1000 * data.number1) + (100 * data.number2) + (10 * data.number3) + data.number4;
      const [VerifyEmail, isError] = useVerifyEmailMutation();

      const response = await VerifyEmail({email: params.email, code: code});
      console.log(response.data);
    }catch (e){
      console.log(e)
    }
  }

  return (
    <div className='h-screen bg-primaryWhite flex flex-col items-center justify-center gap-40'>
      <div className='text-center'>
      <h2 className='text-black text-4xl font-bold'>Confirme sua conta</h2>
      <p className='text-black text-lg'>Digite o código enviado para email de cadastro e confirme sua conta.</p>
      </div>
        <form onSubmit={handleSubmit(handleSubmitCode)} className='flex flex-col items-center space-y-20 w-3/4'>
          <div className='flex items-center gap-10 '>
            <Input type='number' className='border-0 rounded-none border-b-[1px] shadow-none border-b-black 
            bg-transparent text-black outline-none text-5xl text-center h-full' maxLength={1} {...register("number1")}/>
            <Input type='number' className='border-0 rounded-none border-b-[1px] shadow-none border-b-black 
            bg-transparent text-black outline-none text-5xl text-center h-full' maxLength={1} {...register("number2")}/>
            <Input type='number' className='border-0 rounded-none border-b-[1px] shadow-none border-b-black 
            bg-transparent text-black outline-none text-5xl text-center h-full' maxLength={1} {...register("number3")}/>
            <Input type='number' className='border-0 rounded-none border-b-[1px] shadow-none border-b-black 
            bg-transparent text-black outline-none text-5xl text-center h-full' maxLength={1} {...register("number4")}/>        
          </div>
          <Button type='submit' className='text-center w-1/2 p-2 text-lg'>Confirmar conta</Button>
        </form>
    </div>
  )
}

export default VerifyEmail