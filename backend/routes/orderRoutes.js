import express from "express";
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders } from "../controllers/orderController.js";
import { authorizeUser } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", authorizeUser, addOrderItems);

router.get("/myorders", authorizeUser, getMyOrders);

router.get("/:id", authorizeUser, getOrderById);

router.put("/:id/pay", authorizeUser, updateOrderToPaid);



export default router;