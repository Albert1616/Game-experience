import { UserType } from "@/utils/formTypesZod";
import { Game } from "@/utils/types";

const api_url = "http://localhost:8000";

export const GetGames = async () => {
    try {
        const response = await fetch(`${api_url}/games/`);

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
        const response = await fetch(`${api_url}/games/latest`);

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
        const response = await fetch(`${api_url}/games/rating`);

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

export const GetGamesByGenre = async (genre: string) => {
    try {
        const response = await fetch(`${api_url}/games/genre?genre=${genre}`);

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

export const RegisterUser = async (user: UserType) => {
    try {
        const response = await fetch(`${api_url}/user/register`, {
            method: 'POST',
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                password: user.password,
                confirm_password: user.confirm_password
            })
        })

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message)
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`${error}`)
    }
}