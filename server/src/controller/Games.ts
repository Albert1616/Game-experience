import { Request, Response } from 'express';
import { ApiResponseGames } from '../../utils/types/GameTypes';
import { PrismaClient } from '@prisma/client';
import { GetGameDetail } from '../service/Game';
import jwt from 'jsonwebtoken';

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

export const GetGameById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const game = await GetGameDetail(id);

        if (!game) {
            res.status(400).json({ message: "Este game não existe na base de dados" });
            return;
        }

        res.status(200).json(game);
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

export const GameToFavorite = async (req: Request, res: Response) => {
    try {
        const { gameId }:
            { gameId: string } = req.body;

        if (!gameId) {
            res.status(400).json({ message: "Campos obrigatórios não informados" });
            return;
        }

        const acessToken = req.cookies.AcessToken;

        if (!acessToken) {
            res.status(400).json({ message: "Usuário não está autenticado." });
            return;
        }

        const payload =
            jwt.verify(acessToken, process.env.JWT_SECRET_KEY as string) as { userId: string }

        const userId = payload.userId;
        const game = await GetGameDetail(gameId);

        if (!game) {
            res.status(404).json({ message: "Esse jogo não existe na base de dados" });
            return;
        }

        const gameIsFavorite = await prisma.favoriteGame.findFirst({ where: { id: Number(gameId), userId: userId } });

        if (gameIsFavorite) {
            await prisma.favoriteGame.delete({
                where: {
                    id: gameIsFavorite.id
                }
            })

            res.status(200).json({ message: "O game foi removido dos seus favoritos",
                method: "Delete"
             });
            return;
        }else{
            await prisma.favoriteGame.create({
                data:{
                    id: Number(gameId),
                    userId: userId,
                    background_image: game.background_image,
                    name: game.name,
                }
            })
    
            res.status(200).json({
                message: `Game favoritado com sucesso!`,
                method: "Add"   
            })
        }
    } catch (error) {
        res.status(500).json({ message: "Não foi possível favoritar o game" })
    }
}

export const isFavorite = async (req: Request, res: Response) => {
    try {
        const { id } = req.query;

        const gameFavorite = await prisma.favoriteGame.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!gameFavorite) {
            res.status(401).json(false);
            return;
        }

        res.status(200).json(true);
    } catch (error) {
        res.status(500).json({ message: "Ocorreu um erro ao verificar se o jogo é favorito." })
    }
}

export const GetFavoriteGamesByUser = async (req: Request, res: Response) => {
    try {
        const acessToken = req.cookies.AcessToken;

        const payload = jwt.verify(acessToken, process.env.JWT_SECRET_KEY as string) as { userId: string };

        if (!payload){
            res.status(400).json({message: "Token inválido!"});
            return;
        }

        const games = await prisma.favoriteGame.findMany({
            where:{
                userId: payload.userId
            }
        })

        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({message: `Ocorreu um erro ao retornar games favoritos do usuário ${error}`});
    }
}