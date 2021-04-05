import express from "express";

// controllers
import { authUser, getUserProfile } from "../controllers/userController.js";

// middleware
import { protect } from "../middleware/authMiddleware.js";

// init router
const router = express.Router();

router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);

export default router;
