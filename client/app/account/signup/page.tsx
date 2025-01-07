'use client'

import StoreProvider from '@/app/StoreProvider'
import ButtonSetMode from '@/components/ButtonSetMode'
import FormRegister from '@/components/formUser/formRegister'
import Image from 'next/image'
import React from 'react'
import { Toaster } from 'sonner'

const page = () => {
    return (
        <StoreProvider>
            <div className='w-full h-screen bg-primaryWhite dark:bg-primaryGray mx-0 flex items-center justify-center transition-colors duration-300 ease-linear'>
                <Toaster richColors position='top-right' duration={5000} expand />
                <div className='lg:w-3/4 w-4/5 h-[35em] bg-primaryGray dark:bg-white rounded-md'>
                    <div className='grid grid-cols-1 lg:grid-cols-7 transition-colors duration-300 delay-150 ease-linear'>
                        <div className='lg:col-span-4 xl:col-span-3 h-[35em] px-8 pt-4 flex flex-col '>
                            <ButtonSetMode className='self-end text-white dark:text-black hover:text-primaryDark hover:dark:text-primary' />
                            <FormRegister />
                        </div>
                        <div className='hidden lg:flex h-[35em] lg:col-span-3 xl:col-span-4 relative rounded-r-md'>
                            <Image
                                src="/bg-god-of-war.png"
                                alt='image de fundo da página de registro'
                                layout='fill'
                                className='absolute rounded-r-md object-cover object-right'
                            />
                        </div>
                    </div>
                </div>
            </div>

        </StoreProvider>
    )
}

export default page