import express from "express";
import upload from "../middleware/uploads.js";
import authMiddleware from "../middleware/authMiddleware.js"
import {
  createPost,
  getPosts,
  likePost,
  addComment,
  deleteComment,

  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

// Create post with image upload
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createPost
);

// Get all posts
router.get("/", getPosts);

// Like
router.post("/:id/like", authMiddleware, likePost);

// Comment
router.post("/:id/comment", authMiddleware, addComment);

// Delete
router.delete("/:id", authMiddleware, deletePost);

router.delete("/comment/:id", authMiddleware, deleteComment);

export default router;
