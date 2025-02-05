import { Router } from "express";
import {
    ChangePassword, GetNewAcessToken, GetUserById,
    GetUsers, Login, Logout, Register, SendPasswordResetLink,
    UserPasswordReset, UserProfile, VerifyEmail, VerifySession
} from "../controller/User";
import passport from "passport";
import { SetHeaderBaeren } from "../middlewares/SetHeaderBaeren";

const router = Router();

// Public routes
router.get("/", GetUsers)
router.get("/getUser/:id", GetUserById)
router.post("/register", Register);
router.post("/verifyEmail", VerifyEmail);
router.post("/login", Login);
router.post("/refreshToken", GetNewAcessToken);
router.post("/logout", Logout);
router.post("/resetPasswordLink", SendPasswordResetLink);
router.post("/resetPassword/:id/:token", UserPasswordReset);

// PROTECTED ROUTSE
router.get("/verifySession", SetHeaderBaeren, passport.authenticate("jwt", { session: false }), VerifySession);
router.get("/profile", SetHeaderBaeren, passport.authenticate("jwt", { session: false }), UserProfile);
router.post("/changePassword", SetHeaderBaeren, passport.authenticate("jwt", { session: false }), ChangePassword)
export default router;