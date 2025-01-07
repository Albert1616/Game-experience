'use client'

import { LINKS } from "@/utils/utils"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useState } from 'react'
import { FaX } from "react-icons/fa6"
import SocialIcons from "./SocialIcons"
import ButtonSetMode from "../ButtonSetMode"

function NavMobile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const path = usePathname();
  return (
    <nav className="flex flex-col h-full lg:hidden">
      {isOpen ?
        <div className="flex flex-col items-center py-7 px-5 fixed
         bg-gray-800 w-[50%] sm:w-[45%] md:w-[40%] md:px-3 z-50 gap-8 h-screen top-0 right-0 animate-side-bar">
          <div className="w-full flex items-center justify-end gap-3">
            <ButtonSetMode className="text-black dark:text-white hover:text-primary dark:hover:text-primaryDark" />
            <FaX onClick={() => setIsOpen(!isOpen)} className="cursor-pointer hover:text-primary hover:dark:text-primary" />
          </div>
          <SocialIcons />
          <div className="w-full flex flex-col items-center gap-5">
            {LINKS.map((link) => {
              return <Link href={link.path} key={link.nome}
                className={`${link.path === path && "text-primary border-b-2 border-primary"} 
                font-bold hover:text-primary`}>{link.nome}</Link>
            })}
          </div>
        </div> :
        <Menu onClick={() => { setIsOpen(!isOpen) }} className="cursor-pointer text-black dark:text-white" />}
    </nav>
  )
}

export default NavMobile