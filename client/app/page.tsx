'use client'

import { GamesYear } from "@/components/gameYear/GamesYear";
import SlideGames from "@/components/slideGames/SlideGames";
import StoreProvider from "./StoreProvider";
import Header from "@/components/header/Header";
import DashBoardWrapper from "@/components/DashBoardWrapper";
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from "./queryClient";
import { typesGames } from "@/utils/types";

export default function Home() {
  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <DashBoardWrapper>
          <Header />
          <div className="px-6 md:px-20 flex flex-col gap-12">
            <GamesYear />
            <div className="h-full w-full flex flex-col pt-[10rem] sm:pt-[2rem] gap-16 sm:gap-32">
              <SlideGames title="Lançamentos" type={typesGames.LATEST} />
              <SlideGames title="Favoritos dos gamers" type={typesGames.RATING} />
            </div>
          </div>
        </DashBoardWrapper>
      </QueryClientProvider>
    </StoreProvider>
  );
}