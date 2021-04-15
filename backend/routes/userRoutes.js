import express from "express";

// controllers
import {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUser,
	updateUser,
} from "../controllers/userController.js";

// middleware
import { protect, admin } from "../middleware/authMiddleware.js";

// init router
const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);
router
	.route("/:id")
	.delete(protect, admin, deleteUser)
	.get(protect, admin, getUser)
	.put(protect, admin, updateUser)

export default router;
