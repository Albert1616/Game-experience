'use client'

import Header from '@/components/header/Header'
import { useProfileQuery } from '@/services/api'
import { CircularProgress } from '@mui/material'
import React from 'react'

const UserProfile = () => {
    const { data: user, isError, isLoading } = useProfileQuery();

    if (isLoading) return <div className='flex flex-col items-center justify-center'><CircularProgress /></div>
    return (
        <div>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
            <p>{user?.id}</p>
        </div>
    )
}

export default UserProfile