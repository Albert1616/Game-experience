import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useVerifyEmailMutation } from '@/services/user'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast, Toaster } from 'sonner'

type Props = {
    email:string
}  
  const codeSchema = z.object({
    number1: z.string().nonempty(),
    number2: z.string().nonempty(),
    number3: z.string().nonempty(),
    number4: z.string().nonempty()
  })
  
  type codeSchemaType = z.infer<typeof codeSchema>;
  
const FormVerifyEmail = ({email}: Props) => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm<codeSchemaType>({
            resolver: zodResolver(codeSchema),
        })
    const [verifyEmail, {isError,error}] = useVerifyEmailMutation();
  
    const SubmitCode = async (data:codeSchemaType) => {
      try{
        const code = (1000 * Number(data.number1)) + (100 * Number(data.number2)) + (10 * Number(data.number3)) + Number(data.number4);
        const emailDecode = decodeURIComponent(email);
        const response = await verifyEmail({email:emailDecode, otp: code});
  
        if (isError){
          toast.error(response.data)
        }

      }catch (error:any){
        toast.error(error.message)
      }
    }
  return (
    <div className='h-screen bg-primaryWhite flex flex-col items-center justify-center gap-40'>
      <div className='text-center'>
        <h2 className='text-black text-4xl font-bold'>Confirme sua conta</h2>
        <p className='text-black text-lg'>Digite o código enviado para email de cadastro e confirme sua conta.</p>
      </div>
        <form className='flex flex-col items-center space-y-20 w-3/4' onSubmit={handleSubmit(SubmitCode)}>
          <div className='flex items-center gap-10 '>
            <Input type="number" className='border-0 rounded-none border-b-[1px] shadow-none border-b-black 
            bg-transparent text-black outline-none text-5xl text-center h-full' {...register("number1")} min={0} max={9}/>
            {errors && <div>{errors.number1?.message}</div>}
            <Input className='border-0 rounded-none border-b-[1px] shadow-none border-b-black 
            bg-transparent text-black outline-none text-5xl text-center h-full' {...register("number2")} />
            {errors && <div>{errors.number2?.message}</div>}
            <Input type="number" className='border-0 rounded-none border-b-[1px] shadow-none border-b-black 
            bg-transparent text-black outline-none text-5xl text-center h-full' {...register("number3")} min={0} max={9}/>
            {errors && <div>{errors.number3?.message}</div>}
            <Input type="number" className='border-0 rounded-none border-b-[1px] shadow-none border-b-black 
            bg-transparent text-black outline-none text-5xl text-center h-full' {...register("number4")} min={0} max={9}/> 
            {errors && <div>{errors.number4?.message}</div>}       
          </div>
          <Button type='submit' className='text-center w-1/2 p-2 text-lg'>Confirmar conta</Button>
        </form>
        <Toaster richColors expand/>
    </div>
  )
}

export default FormVerifyEmail