import React, { useEffect, useState } from 'react'
import NavMobile from './NavMobile'
import Nav from './Nav'
import Logo from '../Logo'
import SocialIcons from './SocialIcons';
import ButtonSetMode from '../ButtonSetMode';
import UserLoginModal from './UserLoginModal';
import Cookie from 'js-cookie';
import UserProfile from './UserProfile';

function Header() {
  const [isAuth, setIsAuth] = useState(false);
  const session = Cookie.get("acessToken");

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
          {isAuth ? <UserProfile />: <UserLoginModal />}
        </div>
      </div>
    </div>
  )
}

export default Header