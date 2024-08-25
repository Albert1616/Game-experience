import React from 'react'
import { FaSearch, FaSteam, FaTwitter, FaYoutube } from 'react-icons/fa'

function SocialIcons() {
  return (
    <div className='flex gap-4 items-center'>
        <FaYoutube size={21} className="cursor-pointer hover:scale-125 hover:text-primary transition duration-300 ease-in-out"/>
        <FaTwitter size={21} className="cursor-pointer hover:scale-125 hover:text-primary transition duration-300 ease-in-out"/>
        <FaSteam size={21} className="cursor-pointer hover:scale-125 hover:text-primary transition duration-300 ease-in-out"/>
    </div>
)
}

export default SocialIcons