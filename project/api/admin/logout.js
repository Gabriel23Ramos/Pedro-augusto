const isProd = process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";

export default function handler(req, res) {
  const cookie = [
    "admin_session=",
    "HttpOnly",
    "SameSite=Strict",
    "Path=/",
    "Max-Age=0",
    isProd ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

  res.setHeader("Set-Cookie", cookie);
  res.status(200).json({ ok: true });
}
