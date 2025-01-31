import { Router } from "express";
import { AddGameToFavorite, GetDetailGame, GetGames, GetGamesByGenre, GetOrderingByRating, GetOrderingByReleased, SearchGames } from "../controller/Games";
import { SetHeaderBaeren } from "../middlewares/SetHeaderBaeren";
import passport from "passport";

const router = Router();

router.get("/", GetGames);
router.get("/detail/:id", GetDetailGame);
router.get("/latest", GetOrderingByReleased);
router.get("/rating", GetOrderingByRating);
router.get("/search", SearchGames);
router.get("/genre", GetGamesByGenre);

// Proteced routes
router.post("/favorites", SetHeaderBaeren, passport.authenticate('jwt', {session: false}), AddGameToFavorite);

export default router;