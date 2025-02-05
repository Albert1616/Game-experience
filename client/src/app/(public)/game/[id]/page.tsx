import Game from "./Game";
import Header from "@/src/components/header/Header";

interface PropsUrl {
    params: Promise<{ id: string }>
}

export default async function GamePage({ params }: PropsUrl) {
    const id = (await params).id;
    return (
        <section>
            <Header />
            <Game id={id} />
        </section>
    )
}