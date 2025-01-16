'use client'

import React from 'react'
import InputFormUser from './InputFormUser'
import { useForm } from 'react-hook-form'
import { User, UserType } from '@/utils/formTypesZod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useRegisterUserMutation } from '@/services/user'
import { CircularProgress } from '@mui/material'

const FormRegister = () => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm<UserType>({
        resolver: zodResolver(User),
    })
    const [registerUser, {isLoading, isError, error, isSuccess}] = useRegisterUserMutation();
    
    const router = useRouter();
    const handleCreateUser = async (data: UserType) => {
        try {
            const response = await registerUser(data);
            if (isError){
                toast.error(`${error}`)
            }else{
                toast.success("Conta criada com sucesso! um código de verificação foi enviado para seu email,acesse e confirme sua conta")
                setTimeout(() => {
                    router.push("/");
                }, 3000)
            }
        } catch (error: any) {
            toast.error(`${error.message}`)
        }

    }
    return (
        <div className='w-full h-full flex flex-col justify-center'>
            <h2 className='text-white dark:text-black text-center text-xl font-semibold'>Crie sua conta</h2>
            <div className='rounded-lg mt-5'>
                <form className='w-full max-h-full flex flex-col items-center gap-10' onSubmit={handleSubmit(handleCreateUser)}>
                    <div className='w-full'>
                        <InputFormUser placeholder='Nome' type='text' name='name' register={register} />
                        {errors.name && <p className='text-red-500 text-xs'>{errors.name.message}</p>}
                    </div>
                    <div className='w-full'>
                        <InputFormUser placeholder='Email' type='email' name='email' register={register} />
                        {errors.email && <p className='text-red-500 text-xs'>{errors.email.message}</p>}
                    </div>
                    <div className='w-full'>
                        <InputFormUser placeholder='Senha' type='password' name='password' register={register} />
                        {errors.password && <p className='text-red-500 text-xs'>{errors.password.message}</p>}
                    </div>
                    <div className='w-full'>
                        <InputFormUser placeholder='Confime sua senha' type='password' name='confirm_password' register={register} />
                        {errors.confirm_password && <p className='text-red-500 text-xs'>{errors.confirm_password.message}</p>}
                    </div>

                    <Button type='submit' className={`w-1/2 text-center ${isSuccess && "cursor-not-allowed"}`}
                    disabled={isLoading}>{isLoading? <CircularProgress className='text-primaryWhite' size={20}/> : isSuccess ? 'Sucesso! 🥳🎉' : 'Criar conta'}</Button>
                </form>
            </div>
        </div>
    )
}

export default FormRegister