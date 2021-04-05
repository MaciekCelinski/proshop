import express from "express";

// controllers
import {
	getProducts,
	getProductById,
} from "../controllers/productController.js";

// init router
const router = express.Router();

// router.get("/", getProducts);
router.route("/", getProducts);

// router.get("/:id", getProductById);
router.route("/:id", getProductById);

export default router;
