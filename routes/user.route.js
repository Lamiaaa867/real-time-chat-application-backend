import express from "express";
import { asynchandler } from "../Utils/asyncHandler.js";
import { getUsers } from "../controllers/user.controller.js";
import protectRoute from "../Middlewares/authentication.js";
const router = express.Router();

router.get("/getuser", protectRoute, asynchandler(getUsers));
export default router;
