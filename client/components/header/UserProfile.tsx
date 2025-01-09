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
  
type Props = {}

const UserProfile = (props: Props) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Image 
            src="./user-profile.jpg"
            alt='imagem padrão de usuário'
            width={200}
            height={200}
            className='rounded-full ring-2 ring-yellow-300' />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserProfile