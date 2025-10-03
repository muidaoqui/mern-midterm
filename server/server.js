import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import positionRoutes from "./routes/positionRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
connectDB();

// Routes
app.use("/api/teachers", teacherRoutes);
app.use("/api/teacher-positions", positionRoutes);

// Cổng chạy
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
