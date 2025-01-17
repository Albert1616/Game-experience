import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import Link from 'next/link'
  
const UserProfile = () => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Image 
            src="/user-profile.jpg"
            alt='imagem padrão de usuário'
            width={80}
            height={80}
            className='bg-cover inline-block size-10 rounded-full p-0 ring-2 ring-yellow-300' />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-white text-black'>
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator className='bg-black/20'/>
            <DropdownMenuItem>
              <Link href="/user/profile" className='text-black font-extrabold hover:text-black/80 hover:underline'>
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
            <Link href="/user/profile" className='text-black font-extrabold hover:text-black/80 hover:underline'>
                Favoritos
              </Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserProfile