'use client'

import React from 'react'

type Props = {
    children: React.ReactNode
}

const DashBoardWrapper = ({ children }: Props) => {
    return (
        <div className="flex flex-col min-h-screen container mx-auto relative">
            {children}
        </div>
    )
}

export default DashBoardWrapper