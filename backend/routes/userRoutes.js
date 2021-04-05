import express from "express";

// controllers
import { authUser } from "../controllers/userController.js";

// init router
const router = express.Router();

router.post("/login", authUser);

export default router;
