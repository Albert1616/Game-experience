'use client'

import { LINKS } from "@/utils/utils"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useState } from 'react'
import { FaX } from "react-icons/fa6"
import SocialIcons from "./SocialIcons"

function NavMobile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const path = usePathname();
  return (
    <nav className="flex flex-col h-full lg:hidden">
      {isOpen ?
        <div className="flex flex-col items-end py-7 px-5 fixed
         bg-gray-800 w-[50%] sm:w-[45%] md:w-[40%] md:px-3 z-50 gap-8 h-screen top-0 right-0 animate-side-bar">
          <FaX onClick={() => setIsOpen(!isOpen)} className="cursor-pointer" />
          <SocialIcons />
          <div className="flex flex-col items-end gap-5 mt-8">
            {LINKS.map((link) => {
              return <Link href={link.path} key={link.nome}
                className={`${link.path === path && "text-primary border-b-2 border-primary"} 
                font-bold hover:text-primary`}>{link.nome}</Link>
            })}
          </div>
        </div> :
        <Menu onClick={() => { setIsOpen(!isOpen) }} className="cursor-pointer" />}
    </nav>
  )
}

export default NavMobile