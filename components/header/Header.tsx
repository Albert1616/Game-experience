import React from 'react'
import NavMobile from './NavMobile'
import Nav from './Nav'
import Logo from '../Logo'
import SocialIcons from './SocialIcons';
import { Button } from '../ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { setIsDarkMode } from '@/lib/features/globalSlicer';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Moon, Sun } from 'lucide-react';

function Header() {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const dispatch = useAppDispatch();

  const handleViewMode = () => {
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    dispatch(setIsDarkMode(!isDarkMode));
  }
  return (
    <div className='container bg-background dark:bg-black fixed inset-x-0 right-0 left-0 z-50 top-0 shadow-sm mx-auto py-5 flex 
    justify-between items-center text-xl'>
      <Logo />
      <NavMobile />
      <Nav />
      <div className='hidden lg:flex items-center gap-5'>
        <SocialIcons />
        <button onClick={() => handleViewMode()} className='text-lg md:text-xl bg-transparent 
        border-none text-black dark:text-white hover:text-primary dark:hover:text-primary'>
          {isDarkMode ? (
            <Sun />
          ) : (
            <Moon />
          )}
        </button>
      </div>
    </div>
  )
}

export default Header