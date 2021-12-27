import express from "express";
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } from "../controllers/userController.js";
import { authorizeUser, adminCheck } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", authorizeUser, adminCheck, getUsers)
router.post("/", registerUser);
router.post("/login", authUser);

router.get("/profile", authorizeUser, getUserProfile);
router.put("/profile", authorizeUser, updateUserProfile)

router.get("/:id", authorizeUser, adminCheck, getUserById);
router.put("/:id", authorizeUser, adminCheck, updateUser);
router.delete("/:id", authorizeUser, adminCheck, deleteUser);

export default router;