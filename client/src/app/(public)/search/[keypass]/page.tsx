import Header from '@/src/components/header/Header'
import React from 'react'
import SearchGamesResult from './SearchGamesResult'

type Props = {
    params: Promise<{ keypass: string }>
}

export default async function PageSearchResults({ params }: Props) {
    const keypass = (await params).keypass;
    return (
        <section>
            <Header />
            <SearchGamesResult keypass={keypass} />
        </section>
    )
}