'use client'

import { LINKS } from '@/utils/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function Nav() {
const path = usePathname();
  return (
    <div className='hidden md:flex'>
        <nav className='flex items-center justify-center gap-10'>
            {LINKS.map((link) => {
                return <Link href={link.path} key={link.nome} 
                className={`${link.path === path && "text-primary border-b-2 border-primary"} 
                font-bold hover:text-primary`}>{link.nome}</Link>
            })}
        </nav>
    </div>
  )
}

export default Nav