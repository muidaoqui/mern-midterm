import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Invalid email"]
    },
    password: { type: String, required: true },
    currentApiKey: { type: String, default: null }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
