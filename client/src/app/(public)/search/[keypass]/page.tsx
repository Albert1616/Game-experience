import Header from '@/components/header/Header'
import React from 'react'
import SearchGamesResult from './SearchGamesResult'
import StoreProvider from '@/src/app/StoreProvider'

type Props = {
    params: Promise<{ keypass: string }>
}

export default async function PageSearchResults({ params }: Props) {
    const keypass = (await params).keypass;
    return (
        <StoreProvider>
            <Header />
            <SearchGamesResult keypass={keypass} />
        </StoreProvider>
    )
}