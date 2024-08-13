import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href='/'>
        <h1 className='text-white font-semibold text-2xl'><span className='text-primary text-4xl font-bold'>G</span>ame <span className='text-primary text-4xl font-bold'>E</span>xperience</h1>
    </Link>
  )
}

export default Logo