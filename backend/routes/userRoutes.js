import express from "express";

// controllers
import {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
} from "../controllers/userController.js";

// middleware
import { protect } from "../middleware/authMiddleware.js";

// init router
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

export default router;
