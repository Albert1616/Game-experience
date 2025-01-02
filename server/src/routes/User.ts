import { Router } from "express";
import { GetUsers, Login, Register, VerifyEmail } from "../controller/User";

const router = Router();

router.get("/", GetUsers)
router.post("/register", Register);
router.post("/verifyEmail", VerifyEmail);
router.post("/login", Login);

export default router;