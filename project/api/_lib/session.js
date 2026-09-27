import crypto from "crypto";

// SESSION_SECRET is a server-only environment variable (set in Vercel),
// used to sign the admin session cookie. It never reaches the browser.
const SECRET = process.env.SESSION_SECRET || "";

export function createSessionToken(hours = 12) {
  const exp = Date.now() + hours * 60 * 60 * 1000;
  const payload = String(exp);
  const sig = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expected = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  const exp = Number(payload);
  return Number.isFinite(exp) && Date.now() < exp;
}

export function parseCookies(req) {
  const header = req.headers.cookie || "";
  return Object.fromEntries(
    header
      .split(";")
      .map((c) => c.trim())
      .filter(Boolean)
      .map((c) => {
        const idx = c.indexOf("=");
        return [c.slice(0, idx), decodeURIComponent(c.slice(idx + 1))];
      })
  );
}

export function isAuthenticated(req) {
  const cookies = parseCookies(req);
  return verifySessionToken(cookies.admin_session);
}
