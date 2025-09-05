import "dotenv/config.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./db.js";
import usersRoute from "./routes/users.js";
import postsRoute from "./routes/posts.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ status: "ok", name: "MERN Midterm API" }));

app.use("/users", usersRoute);
app.use("/posts", postsRoute);

app.use((req, res) => res.status(404).json({ message: "Not Found" }));

const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`)))
  .catch((err) => {
    console.error("Cannot connect DB:", err);
    process.exit(1);
  });
