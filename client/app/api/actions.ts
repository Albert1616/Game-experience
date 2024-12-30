import { Game } from "@/utils/types";

export const GetGames = async () => {
    try {
        const response = await fetch("http://localhost:8000/games/");

        if (!response.ok) {
            throw new Error("Server error")
        }

        const data = await response.json();
        const games: Game[] = data.results;
        return games;
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const GetLatestGames = async () => {
    try {
        const response = await fetch("http://localhost:8000/games/latest");

        if (!response.ok) {
            throw new Error("Error in response server")
        }

        const data = await response.json();
        const games: Game[] = data.results;
        return games;
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const GetRatingGames = async () => {
    try {
        const response = await fetch("http://localhost:8000/games/rating");

        if (!response.ok) {
            throw new Error("Error in response server")
        }

        const data = await response.json();
        const games: Game[] = data.results;
        return games;
    } catch (error) {
        throw new Error(`${error}`)
    }
}