'use client'

import React from 'react'

type Props = {
    children: React.ReactNode
}

const DashBoardWrapper = ({ children }: Props) => {
    return (
        <div className="flex flex-col min-h-screen container mx-auto px-12 md:px-0">
            {children}
        </div>
    )
}

export default DashBoardWrapper