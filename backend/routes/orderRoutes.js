import express from "express";
import { addOrderItems } from "../controllers/orderController.js";
import { authorizeUser } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", authorizeUser, addOrderItems);


export default router;