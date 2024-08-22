import React from 'react'
import NavMobile from './NavMobile'
import Nav from './Nav'
import Logo from './Logo'

function Header() {
  return (
    <div className='container sticky inset-x-0 top-0 shadow-xl mx-auto py-4 flex justify-between items-center text-xl'>
        <Logo />
        <NavMobile />
        <Nav />
    </div>
  )
}

export default Header