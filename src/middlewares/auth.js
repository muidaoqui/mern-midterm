import User from "../models/User.js";
import { parseApiKey } from "../utils/apiKey.js";

export async function requireApiKey(req, res, next) {
  const apiKey = req.query.apiKey;
  if (!apiKey) {
    return res.status(401).json({ message: "Missing apiKey in query" });
  }

  const parsed = parseApiKey(apiKey);
  if (!parsed) {
    return res.status(401).json({ message: "Invalid apiKey format" });
  }

  const user = await User.findOne({ _id: parsed.userId, email: parsed.email.toLowerCase() });
  if (!user || user.currentApiKey !== apiKey) {
    return res.status(401).json({ message: "apiKey not authorized" });
  }

  req.authUser = user;
  next();
}
