import { Router } from "express";
import { GameToFavorite, GetGameById, GetGames, GetGamesByGenre, GetOrderingByRating, GetOrderingByReleased, SearchGames } from "../controller/Games";
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
router.post("/favorites", SetHeaderBaeren, passport.authenticate('jwt', { session: false }), GameToFavorite);

export default router;