import StoreProvider from "@/src/app/StoreProvider";
import Game from "./Game";
import Header from "@/components/header/Header";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";

interface PropsUrl {
    params: Promise<{ id: string }>
}

export default async function GamePage({ params }: PropsUrl) {
    const id = (await params).id;
    return (
        <StoreProvider>
            <Header />
            <Game id={id} />
            {/* <Suspense fallback={<CircularProgress />}>
                <Game id={params.id} />
            </Suspense> */}
        </StoreProvider>
    )
}