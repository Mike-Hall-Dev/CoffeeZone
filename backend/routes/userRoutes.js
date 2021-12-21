import express from "express";
import { authUser, getUserProfile, registerUser } from "../controllers/userController.js";
import { authorizeUser } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);

router.get("/profile", authorizeUser, getUserProfile);

export default router;