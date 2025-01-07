import { UserCredentials, UserCredentialsType } from '@/utils/formTypesZod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import InputFormUser from './InputFormUser'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { error } from 'console'
import Link from 'next/link'
type Props = {}

function FormLogin({}: Props) {
    const {handleSubmit, register, formState:{errors}} = useForm<UserCredentialsType>({
        resolver: zodResolver(UserCredentials)
    })

  return (
    <div className='h-full w-full flex flex-col items-center justify-center gap-10'>
        <h2 className='text-black text-xl font-bold'>Login</h2>
        <form className='w-full flex flex-col items-left gap-3 px-10'>
            <div className='w-full'>
                <Input placeholder='email' type='email' {...register("email")}
                className='focus:outline-none rounded-lg border 
                border-primaryDark dark:border-primary text-white dark:text-black text-[15px] font-semibold
                placeholder:dark:text-black'/>
                {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
            </div>

            <div className='w-full'>
                <Input placeholder='senha' type='password' {...register("password")}
                className='focus:outline-none rounded-lg border 
                border-primaryDark dark:border-primary text-white dark:text-black text-[15px] font-semibold
                placeholder:dark:text-black'/>
            </div>

            <Link href="/account/signup" className='font-extrabold text-black text-xs'>Esqueceu sua senha?</Link>

            <Button type='submit' className=''>Entrar</Button>
        </form>
    </div>
  )
}

export default FormLogin