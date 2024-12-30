import { Request, Response } from 'express';

export const GetGames = async (req: Request, res: Response) => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/games?key=${process.env.API_KEY}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
            },
        });

        if (!response.ok) {
            res.status(500).send({ message: "Response error" }); // Use return para evitar múltiplas respostas
        }

        const data = await response.json();
        res.status(200).send(data); // Use return para garantir que a execução pare aqui
    } catch (error) {
        res.status(500).send({ message: `Error retrieving games: ${error}` }); // Garantir que a resposta seja enviada e a função pare
    }
};

export const GetOrderingByReleased = async (
    req: Request, res: Response
) => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/games?ordering=released&key=${process.env.API_KEY}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            },
        });

        if (!response.ok) {
            res.status(500).send({ message: "Response error" }); // Use return para evitar múltiplas respostas
        }

        const data = await response.json();
        res.status(200).send(data); // Use return para garantir que a execução pare aqui
    } catch (error) {
        res.status(500).send({ message: `Error retrieving games: ${error}` }); // Garantir que a resposta seja enviada e a função pare
    }
};

export const GetOrderingByRating = async (
    req: Request, res: Response
) => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/games?ordering=-rating&key=${process.env.API_KEY}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            },

        });

        if (!response.ok) {
            res.status(500).send({ message: "Response error" }); // Use return para evitar múltiplas respostas
        }

        const data = await response.json();
        res.status(200).send(data); // Use return para garantir que a execução pare aqui
    } catch (error) {
        res.status(500).send({ message: `Error retrieving games: ${error}` }); // Garantir que a resposta seja enviada e a função pare
    }
};

export const SearchGames = async (
    req: Request, res: Response
) => {
    try {
        const { query } = req.query;
        const response = await fetch(`${process.env.BASE_URL}/games?search=${query}&key=${process.env.API_KEY}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            },
        });

        if (!response.ok) {
            res.status(500).send({ message: "Response error" }); // Use return para evitar múltiplas respostas
        }

        const data = await response.json();
        res.status(200).send(data); // Use return para garantir que a execução pare aqui
    } catch (error) {
        res.status(500).send({ message: `Error retrieving games: ${error}` }); // Garantir que a resposta seja enviada e a função pare
    }
};