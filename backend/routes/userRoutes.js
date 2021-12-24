import express from "express";
import { authUser, getUserProfile, registerUser, updateUserProfile } from "../controllers/userController.js";
import { authorizeUser } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);

router.get("/profile", authorizeUser, getUserProfile);
router.put("/profile", authorizeUser, updateUserProfile)

export default router;