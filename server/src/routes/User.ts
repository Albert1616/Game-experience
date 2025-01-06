import { Router } from "express";
import { ChangePassword, GetNewAcessToken, GetUserById, GetUsers, Login, Logout, Register, SendPasswordResetLink, UserPasswordReset, userProfile, VerifyEmail } from "../controller/User";
import passport from "passport";
import { SetHeaderBaeren } from "../middlewares/SetHeaderBaeren";

const router = Router();

// Public routes
router.get("/", GetUsers)
router.get("/:id", GetUserById)
router.post("/register", Register);
router.post("/verifyEmail", VerifyEmail);
router.post("/login", Login);
router.post("/refreshToken", GetNewAcessToken);
router.post("/logout", Logout);
router.post("/resetPasswordLink", SendPasswordResetLink);
router.post("/resetPassword/:id/:token", UserPasswordReset);

// PROTECTED ROUTSE
router.get("/userProfile", SetHeaderBaeren, passport.authenticate('jwt', { session: false }), userProfile)
router.post("/changePassword", SetHeaderBaeren, passport.authenticate("jwt", { session: false }), ChangePassword)
export default router;