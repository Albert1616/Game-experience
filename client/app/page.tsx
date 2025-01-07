'use client'

import { GamesYear } from "@/components/gameYear/GamesYear";
import SlideGames from "@/components/slideGames/SlideGames";
import StoreProvider from "./StoreProvider";
import Header from "@/components/header/Header";
import DashBoardWrapper from "@/components/DashBoardWrapper";
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from "./queryClient";
import { typesGames } from "@/utils/types";
import RandomGameSection from "@/components/RandomGame/RandomGameSection";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <DashBoardWrapper>
          <Header />
          <div className="flex flex-col gap-4">
            <GamesYear />
            <SlideGames title="Lançamentos" type={typesGames.LATEST} />
            <SlideGames title="Favoritos dos gamers" type={typesGames.RATING} />
            <RandomGameSection />
          </div>
        </DashBoardWrapper>
      </QueryClientProvider>
    </StoreProvider>
  );
}