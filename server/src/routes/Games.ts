import { Router } from "express";
import { GetGames, GetOrderingByAdded, GetOrderingByRating, SearchGames } from "../controller/Games";

const router = Router();

router.get("/", GetGames);
router.get("/latest", GetOrderingByAdded);
router.get("/rating", GetOrderingByRating);
router.get("/search", SearchGames);
export default router;