import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useLogoutMutation } from '@/src/services/api'
import { useRouter } from 'next/navigation'

const UserProfile = () => {
  const [logout, { isLoading, isError }] = useLogoutMutation();
  const router = useRouter()

  const logoutUser = () => {
    logout();
    window.location.reload();
  }
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
        <DropdownMenuSeparator className='bg-black/20' />
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
        <DropdownMenuItem>
          <Button onClick={logoutUser}
            className='text-red-500 font-extrabold hover:text-black/80 text-left hover:underline bg-transparent hover:bg-transparent border-none shadow-none'>
            Sair
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserProfile