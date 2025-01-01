import { Router } from "express";
import { Register, VerifyEmail } from "../controller/User";

const router = Router();

router.post("/register", Register);
router.post("/verifyEmail", VerifyEmail);

export default router;