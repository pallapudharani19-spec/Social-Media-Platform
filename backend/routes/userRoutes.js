import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getProfile,
  updateProfile,
  followUser,
  getFollowers,
  getFollowing,
  getUserById,
  getAllUsers
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", authMiddleware, getAllUsers);

router.get("/profile", authMiddleware, getProfile);

router.put("/profile", authMiddleware, updateProfile);

router.post("/follow/:id", authMiddleware, followUser);

router.get("/followers", authMiddleware, getFollowers);

router.get("/following", authMiddleware, getFollowing);

router.get("/:id", authMiddleware, getUserById);

export default router;