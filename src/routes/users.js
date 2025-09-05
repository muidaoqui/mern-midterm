import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { buildApiKey } from "../utils/apiKey.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body || {};
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "userName, email, password are required" });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email: email.toLowerCase(),
      password: hashed
    });

    return res.status(201).json({
      message: "Registered successfully",
      user: { _id: user._id, userName: user.userName, email: user.email }
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid email or password" });

    const apiKey = buildApiKey(user._id.toString(), user.email);
    user.currentApiKey = apiKey;
    await user.save();

    return res.json({
      message: "Login successful",
      apiKey
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
