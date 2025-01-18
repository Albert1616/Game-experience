import { UserCredentials, UserCredentialsType } from '@/utils/formTypesZod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { toast } from 'sonner'
import { errorType } from '@/utils/types'
import { useLoginMutation } from '@/services/api'
import { CircularProgress } from '@mui/material'
import { SetCookies } from '@/app/(cookies)/cookies'
import { useAppDispatch } from '@/lib/store'
import { setLoginModalIsOpen } from '@/lib/features/globalSlicer'

function FormLogin() {
    const { handleSubmit, register, formState: { errors } } = useForm<UserCredentialsType>({
        resolver: zodResolver(UserCredentials)
    })
    const [login, { isLoading, isError }] = useLoginMutation()
    const dispatch = useAppDispatch();

    const handleLogin = async (credentials: UserCredentialsType) => {
        try {
            const response = await login(credentials);

            if (isError) {
                const error = response.error as errorType;
                return toast.error(error.data.message);
            }
            const data = response.data;

            SetCookies("AcessToken", data!.acessToken, data!.acessTokenExpiration);
            SetCookies("RefreshToken", data!.refreshToken, data!.refreshTokenExpiration);

            dispatch(setLoginModalIsOpen(false));
            toast.success("Login efetuado com sucesso!");
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div className='h-full w-full flex flex-col items-center justify-center gap-10'>
            <h2 className='text-black text-xl font-bold'>Login</h2>
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
                    {isLoading ? <CircularProgress /> : "Entrar"}
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