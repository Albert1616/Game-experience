import React from 'react'
import NavMobile from './NavMobile'
import Nav from './Nav'
import Logo from './Logo'

function Header() {
  return (
    <div className='container mx-auto py-4 flex justify-between items-center text-xl'>
        <Logo />
        <NavMobile />
        <Nav />
    </div>
  )
}

export default Header