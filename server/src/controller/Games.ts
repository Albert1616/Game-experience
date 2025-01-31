import { Request, Response } from 'express';
import { ApiResponseGames, Game } from '../../utils/types/GameTypes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GetGames = async (req: Request, res: Response) => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/games?key=${process.env.API_KEY}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
            },
        });

        if (!response.ok) {
            res.status(500).json({ message: "Response error" }); // Use return para evitar múltiplas respostas
        }

        const data = await response.json() as ApiResponseGames;
        res.status(200).json(data.results); // Use return para garantir que a execução pare aqui
    } catch (error) {
        res.status(500).json({ message: `Error retrieving games: ${error}` }); // Garantir que a resposta seja enviada e a função pare
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
            res.status(500).json({ message: "Response error" }); // Use return para evitar múltiplas respostas
        }

        const data = await response.json() as ApiResponseGames;
        res.status(200).json(data.results); // Use return para garantir que a execução pare aqui
    } catch (error) {
        res.status(500).json({ message: `Error retrieving games: ${error}` }); // Garantir que a resposta seja enviada e a função pare
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
            res.status(500).json({ message: "Response error" });
            return; // Use return para evitar múltiplas respostas
        }

        const data = await response.json() as ApiResponseGames;
        res.status(200).json(data.results); // Use return para garantir que a execução pare aqui
    } catch (error) {
        res.status(500).json({ message: `Error retrieving games: ${error}` }); // Garantir que a resposta seja enviada e a função pare
    }
};

export const GetDetailGame = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await fetch(`${process.env.BASE_URL}/games/${id}?key=${process.env.API_KEY}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
            },
        });

        const data = await response.json() as Game;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: `Erro ao retornar detalhes do jogo. ${error}` })
    }
}

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
            res.status(500).json({ message: "Response error" }); // Use return para evitar múltiplas respostas
        }

        const data = await response.json() as ApiResponseGames;
        res.status(200).json(data.results); // Use return para garantir que a execução pare aqui
    } catch (error) {
        res.status(500).json({ message: `Error retrieving games: ${error}` }); // Garantir que a resposta seja enviada e a função pare
    }
};

export const GetGamesByGenre = async (req: Request, res: Response) => {
    try {
        const { genre } = req.query;
        const response = await fetch(`${process.env.BASE_URL}/games?genres=${genre}&key=${process.env.API_KEY}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            },
        });

        if (!response.ok) {
            res.status(500).json({ message: "Response error" });
        }

        const data = await response.json() as ApiResponseGames;
        res.status(200).json(data.results);
    } catch (error) {
        res.status(500).json({ message: `Error retrieving games: ${error}` });
    }
}

export const AddGameToFavorite = async (req: Request, res: Response) => {
    try {
        const {user,gameId} :
        {user:string,gameId:string} = req.body;

        if (!user || !gameId){
            res.status(400).json({message:"Campos obrigatórios não informados"});
            return;
        }

        const game = await GetDetailGame(req, res);

        if (!game){
            res.status(404).json({message:"Esse jogo não existe na base de dados"});
            return;
        }

        if (await prisma.favoriteGame.findMany({where: {userId:user}})){
            res.status(400).json({message:"O jogo ja esta nos seus favoritos"});
            return;
        }

        const userUpdated = await prisma.user.update({
            where:{
                id: user
            },
            data:{
                favorites: {
                    create:{
                        id: game.id,
                        title: game.name,
                        image: game.background_image,
                    }
                }
            }
        })

        res.status(200).json({message:`Game favoritado com sucesso!`,
            user: userUpdated
        },
            
        )
        
    } catch (error) {
        res.status(500).json({message : "Não foi possível favoritar o game"})
    }
}