import express from "express";
import { logIn, logOut, signUp } from "../controllers/auth.controller.js";
import { asynchandler } from "../Utils/asyncHandler.js";
const router = express.Router();
router.post("/signup", asynchandler(signUp));
router.post("/login", asynchandler(logIn));
router.post("/logout", asynchandler(logOut));
export default router;
