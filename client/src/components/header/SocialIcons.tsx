import { setSearchModalIsOpen } from '@/src/lib/features/globalSlicer';
import { useAppDispatch } from '@/src/lib/store';
import Link from 'next/link';
import React from 'react'
import { FaSearch, FaSteam, FaTwitter, FaYoutube } from 'react-icons/fa'
import { FaTwitch } from 'react-icons/fa6';

function SocialIcons() {
  const dispatch = useAppDispatch();


  const style = "cursor-pointer text-2xl md:text-xl md:text-2xl hover:scale-125 text-primary dark:text-primaryDark transition duration-200 ease-in-out";
  return (
    <div className='flex gap-4 items-center'>
      <button onClick={() => dispatch(setSearchModalIsOpen(true))}>
        <FaSearch className={style} />
      </button>
      <Link href='/'>
        <FaYoutube className={style} />
      </Link>
      <Link href='/'>
        <FaTwitch className={style} />
      </Link>
      <Link href='/'>
        <FaTwitter className={style} />
      </Link>
      <Link href='/'>
        <FaSteam className={style} />
      </Link>
    </div>
  )
}

export default SocialIcons