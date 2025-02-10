'use client'

import DashBoardWrapper from '@/src/components/DashBoardWrapper'
import { useGetGamesFavoritesQuery, useProfileQuery } from '@/src/services/api'
import { CircularProgress } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { MdArrowBack } from 'react-icons/md'

const UserProfile = () => {
    const { data: user, isError, isLoading } = useProfileQuery();
    const {data: games } = useGetGamesFavoritesQuery()

    if (isLoading) return <div className='flex flex-col items-center justify-center'><CircularProgress /></div>
    return (
        <div className='p-2'>
            <DashBoardWrapper>
                <section>
                    <button className="">
                        <MdArrowBack size={30} className='text-black'/>
                    </button>
                    <div className='grid grid-cols-6'>
                        <div className='flex flex-col items-center col-span-2'>
                            <div className='flex gap-2 mt-10'>
                                <Image
                                        src="/user-profile.jpg"
                                        alt='imagem padrão de usuário'
                                        width={400}
                                        height={400}
                                        className='h-[20em] w-[20em] rounded-full bg-cover p-0 ring-2 ring-yellow-300' />                  
                            </div>
                            <div className='flex flex-col items-center mt-2'>
                                <h3 className='text-3xl text-black dark:text-white font-bold'>{user?.nome}</h3>
                                <p className='text-xl text-black dark:text-white font-semibold'>{user?.email}</p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center col-span-3'>
                            <h2 className='text-4xl text-black dark:text-white font-bold'>Favoritos</h2>
                            {games && (
                                (games.length > 0 ? (
                                    (games.map((game) => (
                                        <div className='w-full flex items-center gap-2'>
                                            <Image
                                            src={game.background_image}
                                            alt="Imagem de um game."
                                            width={100}
                                            height={100}
                                            quality={100} />
                                            <h3>{game.name}</h3>
                                        </div>
                                    )))
                                ) : (
                                    <div>
                                        <p>Você não possui jogos favoritos</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </DashBoardWrapper>
        </div>
    )
}

export default UserProfile