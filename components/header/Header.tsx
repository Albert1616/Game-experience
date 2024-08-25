import React from 'react'
import NavMobile from './NavMobile'
import Nav from './Nav'
import Logo from '../Logo'
import {FaYoutube, FaTwitter, FaSteam, FaSearch} from 'react-icons/fa';


function Header() {
  return (
    <div className='container bg-black sticky inset-x-0 top-0 shadow-xl mx-auto py-4 flex 
    justify-between items-center text-xl'>
        <Logo />
        <NavMobile />
        <Nav />
        <div className='hidden lg:flex gap-4 items-center'>
        <div className='flex gap-4 items-center'>
            <FaSearch size={21} className="cursor-pointer hover:scale-125 hover:text-primary transition duration-300 ease-in-out"/>
            <FaYoutube size={21} className="cursor-pointer hover:scale-125 hover:text-primary transition duration-300 ease-in-out"/>
            <FaTwitter size={21} className="cursor-pointer hover:scale-125 hover:text-primary transition duration-300 ease-in-out"/>
            <FaSteam size={21} className="cursor-pointer hover:scale-125 hover:text-primary transition duration-300 ease-in-out"/>
          </div>
        </div>
    </div>
  )
}

export default Header