import { v4 as uuidv4 } from "uuid";

export function buildApiKey(userId, email) {
  const random = uuidv4(); // randomstring
  return `mern-$${userId}$-$${email}$-$${random}$`;
}

export function parseApiKey(apiKey) {
  // mern-$<userId>$-$<email>$-$<random>$
  const regex = /^mern-\$([0-9a-fA-F]{24})\$\-\$([^$]+)\$\-\$([A-Za-z0-9-]+)\$$/;
  const m = apiKey?.match(regex);
  if (!m) return null;
  return { userId: m[1], email: m[2], random: m[3] };
}
