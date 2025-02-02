import { Game } from "../../utils/types/GameTypes";

export const GetGameDetail =
    async (
        id: string
    ): Promise<Game | null> => {
        try {
            const response = await fetch(`${process.env.BASE_URL}/games/${id}?key=${process.env.API_KEY}`, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                },
            });

            const data = await response.json() as Game;
            return data;
        } catch (error) {
            return null
        }
    }