import { Router } from "express";
import { GameToFavorite, GetGameById, GetGames, GetGamesByGenre, GetOrderingByRating, GetOrderingByReleased, isFavorite, SearchGames } from "../controller/Games";
import { SetHeaderBaeren } from "../middlewares/SetHeaderBaeren";
import passport from "passport";

const router = Router();

router.get("/", GetGames);
router.get("/detail/:id", GetGameById);
router.get("/latest", GetOrderingByReleased);
router.get("/rating", GetOrderingByRating);
router.get("/search", SearchGames);
router.get("/genre", GetGamesByGenre);

// Proteced routes
router.post("/favorite", SetHeaderBaeren, passport.authenticate('jwt', { session: false }), GameToFavorite);
router.get("/isFavorite", SetHeaderBaeren, passport.authenticate('jwt', { session: false }), isFavorite);

export default router;