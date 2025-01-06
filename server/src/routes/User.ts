import { Router } from "express";
import { ChangePassword, GetNewAcessToken, GetUsers, Login, Logout, Register, userProfile, VerifyEmail } from "../controller/User";
import passport from "passport";
import { SetHeaderBaeren } from "../../utils/SetHeaderBaeren";

const router = Router();

router.get("/", GetUsers)
router.post("/register", Register);
router.post("/verifyEmail", VerifyEmail);
router.post("/login", Login);
router.post("/refreshToken", GetNewAcessToken);
router.post("/logout", Logout);

// PROTECTED ROUTSE
router.get("/userProfile", SetHeaderBaeren, passport.authenticate('jwt', { session: false }), userProfile)
router.post("/changePassword", SetHeaderBaeren, passport.authenticate("jwt", { session: false }), ChangePassword)
export default router;