import express from "express";
import { addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getAllOrders } from "../controllers/orderController.js";
import { authorizeUser, adminCheck } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", authorizeUser, adminCheck, getAllOrders);
router.post("/", authorizeUser, addOrderItems);

router.get("/myorders", authorizeUser, getMyOrders);

router.get("/:id", authorizeUser, getOrderById);

router.put("/:id/pay", authorizeUser, updateOrderToPaid);
router.put("/:id/deliver", authorizeUser, adminCheck, updateOrderToDelivered);



export default router;