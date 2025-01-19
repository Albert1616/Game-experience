import { Router } from "express";
import { GetDetailGame, GetGames, GetGamesByGenre, GetOrderingByRating, GetOrderingByReleased, SearchGames } from "../controller/Games";

const router = Router();

router.get("/", GetGames);
router.get("/detail/:id", GetDetailGame);
router.get("/latest", GetOrderingByReleased);
router.get("/rating", GetOrderingByRating);
router.get("/search", SearchGames);
router.get("/genre", GetGamesByGenre);
export default router;