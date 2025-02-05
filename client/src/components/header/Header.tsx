'use client'

import NavMobile from './NavMobile'
import Nav from './Nav'
import Logo from '../Logo'
import SocialIcons from './SocialIcons';
import ButtonSetMode from '../ButtonSetMode';
import UserLoginModal from './UserLoginModal';
import UserProfile from './UserProfile';
import SearchComponent from '../search/SearchComponent'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/src/lib/store'
import { setIsAuth, setSearchModalIsOpen } from '@/src/lib/features/globalSlicer'
import { motion } from 'framer-motion'
import { useVerifySessionQuery } from '@/src/services/api';
import { useEffect } from 'react';

function Header() {
  const searchModalIsOpen = useAppSelector((state) => state.global.searchModalIsOpen);
  const isAuth = useAppSelector((state) => state.global.isAuth);

  const dispatch = useAppDispatch();

  const { data: verifySession, isLoading } = useVerifySessionQuery();

  useEffect(() => {
    if (!isLoading && verifySession) {
      dispatch(setIsAuth(verifySession.message === "Usuário logado"))
    }
  }, [dispatch, isLoading, verifySession])

  return (
    <div className='bg-background dark:bg-black fixed inset-x-0 right-0 left-0 z-50 top-0 shadow-sm py-5 flex 
    justify-around items-center text-xl'>
      <Logo />
      <NavMobile />
      <Nav />
      <div className='hidden lg:flex items-center gap-5'>
        <SocialIcons />
        <div className='ml-10 flex items-center gap-3'>
          <ButtonSetMode className='text-black dark:text-white hover:text-primary dark:hover:text-primaryDark' />
          {isAuth ? <UserProfile /> : <UserLoginModal />}
        </div>
      </div>
      {searchModalIsOpen && createPortal(
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.3, delay: 0.1 }}
          className="fixed inset-0 w-full h-full bg-black bg-opacity-90 z-[60]">
          <button className='absolute top-2 right-2'
            onClick={() => dispatch(setSearchModalIsOpen(false))}>
            <X className='text-white' size={30} />
          </button>
          <SearchComponent />
        </motion.div>,
        document.body
      )}
    </div>
  )
}

export default Header