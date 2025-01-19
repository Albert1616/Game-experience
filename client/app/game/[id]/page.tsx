'use client'

import StoreProvider from "@/app/StoreProvider";
import Game from "./Game";
import Header from "@/components/header/Header";

interface PropsUrl {
    params: {
        id: string
    }
}

export default function GamePage({ params }: PropsUrl) {
    return (
        <StoreProvider>
            <Header />
            <Game id={params.id} />
        </StoreProvider>
    )
}