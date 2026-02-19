
import express from "express";
import {
  createPost,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost,
  likePost,
  bookmarkPost,
  trendingPosts,
  tagAnalytics
} from "../controllers/post.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/trending", trendingPosts);
router.get("/tags/analytics", tagAnalytics);

router.post("/", protect, createPost);
router.get("/", getPosts);
router.get("/:id", getSinglePost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.post("/:id/like", protect, likePost);
router.post("/:id/bookmark", protect, bookmarkPost);

export default router;
