import React from 'react'

type Props = {
    tag: string
}

const Tag = ({ tag }: Props) => {
    return (
        <div className='w-fit h-fit rounded-r-md px-2 py-1 text-xs bg-primaryDark
    text-black font-extrabold'>
            {tag}
        </div>
    )
}

export default Tag