import express from "express";

// controllers
import {
	getProducts,
	getProductById,
} from "../controllers/productController.js";

// init router
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);


export default router;
