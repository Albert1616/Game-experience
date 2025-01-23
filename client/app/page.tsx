'use client'

import { GamesYear } from "@/components/gameYear/GamesYear";
import SlideGames from "@/components/slideGames/SlideGames";
import StoreProvider from "./StoreProvider";
import Header from "@/components/header/Header";
import DashBoardWrapper from "@/components/DashBoardWrapper";
import { typesGames } from "@/utils/types";
import RandomGameSection from "@/components/RandomGame/RandomGameSection";
import { Toaster } from "sonner";
import SlideGeneralGame from "@/components/slideGeneralGame/slideGeneralGame";
import SearchComponent from "@/components/search/SearchComponent";
import {createPortal} from "react-dom";

export default function Home() {
  return (
    <StoreProvider>
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
    </StoreProvider>
  );
}