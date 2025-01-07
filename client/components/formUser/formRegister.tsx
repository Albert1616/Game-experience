'use client'

import React from 'react'
import InputFormUser from './InputFormUser'
import { useForm } from 'react-hook-form'
import { User, UserType } from '@/utils/formTypesZod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { RegisterUser } from '@/app/api/actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { error } from 'console'

const FormRegister = () => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm<UserType>({
        resolver: zodResolver(User),
    })

    const router = useRouter();
    const handleCreateUser = async (data: UserType) => {
        try {
            toast.success("Conta criada com sucesso! Um link de confirmação foi enviado para o seu email. Por favor acesse e confirme sua conta.")
            const response = await RegisterUser(data);
            router.push("/");
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

                    <Button type='submit'>Criar conta</Button>
                </form>
            </div>
        </div>
    )
}

export default FormRegister