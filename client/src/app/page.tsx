'use client'

import { GamesYear } from "../components/gameYear/GamesYear";
import SlideGames from "@/src/components/slideGames/SlideGames";
import StoreProvider from "./StoreProvider";
import Header from "@/src/components/header/Header";
import DashBoardWrapper from "@/src/components/DashBoardWrapper";
import { typesGames } from "@/src/utils/types";
import RandomGameSection from "@/src/components/RandomGame/RandomGameSection";
import { Toaster } from "sonner";
import SlideGeneralGame from "@/src/components/slideGeneralGame/slideGeneralGame";

export default function Home() {
  return (
    <DashBoardWrapper>
      <Header />
      <div className="flex flex-col gap-4 px-10">
        <GamesYear />
        <SlideGames title="Lançamentos" type={typesGames.LATEST} />
        <SlideGames title="Favoritos dos gamers" type={typesGames.RATING} />
        <RandomGameSection />
        <SlideGeneralGame />
      </div>
    </DashBoardWrapper>
  );
}