import express from "express";
import Post from "../models/Post.js";
import { requireApiKey } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", requireApiKey, async (req, res) => {
  try {
    const { userId, content } = req.body || {};
    if (!userId || !content) {
      return res.status(400).json({ message: "userId and content are required" });
    }
    // Chỉ cho phép tạo post cho chính chủ đã xác thực
    if (req.authUser._id.toString() !== userId) {
      return res.status(403).json({ message: "You can only create posts for yourself" });
    }

    const post = await Post.create({ userId, content });
    return res.status(201).json({ message: "Post created", post });
  } catch (err) {
    console.error("Create post error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", requireApiKey, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body || {};
    if (!content) {
      return res.status(400).json({ message: "content is required" });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId.toString() !== req.authUser._id.toString()) {
      return res.status(403).json({ message: "You can only update your own posts" });
    }

    post.content = content;
    await post.save(); 
    return res.json({ message: "Post updated", post });
  } catch (err) {
    console.error("Update post error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
