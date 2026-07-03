import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { followUser } from "../controllers/followController.js";

const router = express.Router();

// Follow / Unfollow User
router.post("/:id", authMiddleware, followUser);

export default router;