'use client'

import GamesYear from "@/components/gameYear/GamesYear";
import { ApiResponse, Game } from "@/utils/types";
import { useEffect, useState } from "react";





export default function Home() {
  

  return (
      <main className="w-full h-screen pt-5 px-10">
          <GamesYear/>
      </main>
  );
}