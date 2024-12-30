import { Router } from "express";
import { GetGames, GetOrderingByRating, GetOrderingByReleased, SearchGames } from "../controller/Games";

const router = Router();

router.get("/", GetGames);
router.get("/latest", GetOrderingByReleased);
router.get("/rating", GetOrderingByRating);
router.get("/search", SearchGames);
export default router;