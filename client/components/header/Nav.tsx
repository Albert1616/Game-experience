'use client'

import { LINKS } from '@/utils/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaYoutube, FaTwitter, FaSteam, FaSearch } from 'react-icons/fa';
import React from 'react'

function Nav() {
  const path = usePathname();
  return (
    <div className='hidden lg:flex justify-between'>
      <nav className='flex items-center justify-center gap-10'>
        {LINKS.map((link) => {
          return <Link href={link.path} key={link.nome}
            className={`${link.path === path && "text-primary dark:text-primaryDark border-b-2 border-primary dark:border-primaryDark"} 
                font-bold text-black dark:text-white hover:text-primary dark:hover:text-primaryDark`}>{link.nome}</Link>
        })}
      </nav>

    </div>
  )
}

export default Nav