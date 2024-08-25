import React from 'react'
import NavMobile from './NavMobile'
import Nav from './Nav'
import Logo from '../Logo'
import Search from './Search';


function Header() {
  return (
    <div className='container bg-black sticky inset-x-0 top-0 shadow-xl mx-auto py-4 flex 
    justify-between items-center text-xl'>
        <Logo />
        <NavMobile />
        <Nav />
        <div className='hidden lg:flex'>
          <Search />
        </div>
    </div>
  )
}

export default Header