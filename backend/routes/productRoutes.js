import express from "express";

// controllers
import {
	getProducts,
	getProductById,
	deleteProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

// init router
const router = express.Router();

router.get("/", getProducts);
router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct)


export default router;
