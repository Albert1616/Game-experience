import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { LINKS } from "@/utils/utils"
import { Menu } from "lucide-react"
import Link from "next/link"
  import React from 'react'

function NavMobile() {
  return (
    <nav className="flex md:hidden">
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black border-none flex flex-col items-end ease-in-out">
                <DropdownMenuSeparator />
                {LINKS.map((link) => {return <DropdownMenuItem key={link.nome}>
                    <Link href={link.path}>{link.nome}</Link>
                </DropdownMenuItem>})}
            </DropdownMenuContent>
        </DropdownMenu>
    </nav>
  )
}

export default NavMobile