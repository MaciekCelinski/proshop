import express from "express";

// controllers
import {
	getProducts,
	getProductById,
	deleteProduct,
	updateProduct,
	createProduct,
	createProductReview,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

// init router
const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router
	.route("/:id")
	.get(getProductById)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct);

export default router;
