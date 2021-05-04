import express from "express";

// controllers
import {
	addOrderItems,
	getMyOrders,
	getOrderById,
	updateOrderToPaid,
	getOrders,
} from "../controllers/orderController.js";

// protect middleware
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
