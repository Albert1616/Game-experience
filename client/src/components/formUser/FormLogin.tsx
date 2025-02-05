import { UserCredentials, UserCredentialsType } from '@/src/utils/formTypesZod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { toast } from 'sonner'
import { errorType } from '@/src/utils/types'
import { useLoginMutation } from '@/src/services/api'
import { CircularProgress } from '@mui/material'
import { useAppDispatch } from '@/src/lib/store'
import { setLoginModalIsOpen } from '@/src/lib/features/globalSlicer'

function FormLogin() {
    const { handleSubmit, register, formState: { errors } } = useForm<UserCredentialsType>({
        resolver: zodResolver(UserCredentials)
    })
    const [login, { isLoading, isError, isSuccess }] = useLoginMutation()
    const dispatch = useAppDispatch();

    const handleLogin = async (credentials: UserCredentialsType) => {
        try {
            const response = await login(credentials);
            if (isError) {
                const error = response.error as errorType;
                return toast.error(error.data.message);
            }
            toast.success("Login efetuado com sucesso!");
            setTimeout(() => {
                dispatch(setLoginModalIsOpen(false));
            }, 2000);
            window.location.reload();

        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div className='h-full w-full flex flex-col items-center justify-center gap-10'>
            <form onSubmit={handleSubmit(handleLogin)} className='w-full flex flex-col items-left gap-5 px-10'>
                <div className='w-full'>
                    <Input placeholder='email' type='email' {...register("email")}
                        className='focus:outline-none rounded-lg border 
                border-primaryDark text-black text-[15px] font-semibold
                placeholder:dark:text-black'/>
                    {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
                </div>

                <div className='w-full'>
                    <Input placeholder='senha' type='password' {...register("password")}
                        className='focus:outline-none rounded-lg border 
                border-primaryDark text-black text-[15px] font-semibold
                placeholder:dark:text-black'/>
                    {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
                </div>
                <Button type='submit'
                    disabled={isLoading}>
                    {isLoading ? <CircularProgress size={10} /> : "Entrar"}
                </Button>
                <div className=''>
                    <Link href="/account/signup" className='font-extrabold text-black hover:text-gray-700 hover:underline text-xs'>Esqueceu sua senha?</Link>
                    <p className='font-extrabold text-gray-700 text-xs'>Novo por aqui?
                        <Link href="/account/signup" className='text-black hover:underline'>Crie sua conta</Link></p>
                </div>
            </form>
        </div>
    )
}

export default FormLogin