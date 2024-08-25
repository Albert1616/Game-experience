'use client'

import { LINKS } from "@/utils/utils"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useState } from 'react'
import { FaSearch, FaSteam, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaX } from "react-icons/fa6"

function NavMobile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const path = usePathname();
  return (
    <nav className="flex flex-col h-full lg:hidden">
      {isOpen? 
        <div className="flex flex-col items-end py-7 px-5 fixed
         bg-gray-800 w-[40%] z-50 gap-8 h-screen top-0 right-0 animate-side-bar">
          <FaX onClick={() => setIsOpen(!isOpen)} className="cursor-pointer"/>
          <div className='flex gap-4 items-center'>
            <FaSearch size={21} className="cursor-pointer hover:scale-125 hover:text-primary transition duration-300 ease-in-out"/>
            <FaYoutube size={21} className="cursor-pointer hover:scale-125 hover:text-primary transition duration-300 ease-in-out"/>
            <FaTwitter size={21} className="cursor-pointer hover:scale-125 hover:text-primary transition duration-300 ease-in-out"/>
            <FaSteam size={21} className="cursor-pointer hover:scale-125 hover:text-primary transition duration-300 ease-in-out"/>
          </div>
          <div className="flex flex-col items-end gap-5 mt-8">
          {LINKS.map((link) => {
                return <Link href={link.path} key={link.nome} 
                className={`${link.path === path && "text-primary border-b-2 border-primary"} 
                font-bold hover:text-primary`}>{link.nome}</Link>
            })}
          </div>
      </div> : 
      <Menu onClick={() => {setIsOpen(!isOpen)}} className="cursor-pointer"/>}   
    </nav>
  )
}

export default NavMobile