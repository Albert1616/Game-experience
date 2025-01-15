import React, { useEffect, useState } from 'react'
import NavMobile from './NavMobile'
import Nav from './Nav'
import Logo from '../Logo'
import SocialIcons from './SocialIcons';
import ButtonSetMode from '../ButtonSetMode';
import UserLoginModal from './UserLoginModal';
import Cookie from 'js-cookie';
import UserProfile from './UserProfile';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from 'lucide-react';
import Link from 'next/link';


function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const session = Cookie.get("acessToken");

  const handleClose = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    if (session) setIsAuth(true);
  }, [session])
  return (
    <div className='container bg-background dark:bg-black fixed inset-x-0 right-0 left-0 z-50 top-0 shadow-sm mx-auto py-5 flex 
    justify-between items-center text-xl'>
      <Logo />
      <NavMobile />
      <Nav />
      <div className='hidden lg:flex items-center gap-5'>
        <SocialIcons />
        <div className='ml-10 flex items-center gap-2'>
          <ButtonSetMode className='text-black dark:text-white hover:text-primary dark:hover:text-primaryDark' />
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger><User size={30} className='text-black dark:text-white'/></DropdownMenuTrigger>
            <DropdownMenuContent className='bg-primaryWhite text-black flex flex-col items-center'>
              <DropdownMenuItem onClick={handleClose}>
                <UserLoginModal />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleClose}>
                <Link href="/account/signup">Criar conta</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* {isAuth ? <UserProfile />: <UserLoginModal />} */}
        </div>
      </div>
    </div>
  )
}

export default Header