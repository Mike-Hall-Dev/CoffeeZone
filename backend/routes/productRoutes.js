import express from "express";
import { getProductById, getProducts, deleteProduct, createProduct, updateProduct, createProductReview } from "../controllers/productController.js";
import { authorizeUser, adminCheck } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", authorizeUser, adminCheck, createProduct);

router.get("/:id", getProductById);
router.put("/:id", authorizeUser, adminCheck, updateProduct);
router.delete("/:id", authorizeUser, adminCheck, deleteProduct);
router.post("/:id/reviews", authorizeUser, createProductReview)


export default router;