import { createSessionToken } from "../_lib/session.js";

const isProd = process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método não permitido" });
    return;
  }

  const { password } = req.body || {};
  const expected = process.env.ADMIN_PASSWORD || "";

  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!expected || typeof password !== "string" || password !== expected) {
    res.status(401).json({ error: "Senha incorreta." });
    return;
  }

  const token = createSessionToken(12);
  const cookie = [
    `admin_session=${token}`,
    "HttpOnly",
    "SameSite=Strict",
    "Path=/",
    `Max-Age=${12 * 3600}`,
    isProd ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

  res.setHeader("Set-Cookie", cookie);
  res.status(200).json({ ok: true });
}
