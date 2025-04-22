import express from "express";
import { asynchandler } from "../Utils/asyncHandler.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../Middlewares/authentication.js";
const router = express.Router();
router.post("/send", protectRoute, asynchandler(sendMessage));
router.get("/getMessage", protectRoute, asynchandler(getMessages));
export default router;
