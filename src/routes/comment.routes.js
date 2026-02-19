
import express from "express";
import { addComment, getComments } from "../controllers/comment.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:postId", protect, addComment);
router.get("/:postId", getComments);

export default router;
