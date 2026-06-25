export const ADMIN_SESSION_COOKIE = "temren_admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export type SessionPayload = {
  userId: string;
  username: string;
  role: string;
  exp: number;
};

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    console.warn("ADMIN_SESSION_SECRET is not set — using fallback (set in production!)");
  }
  return secret || "temren-dev-session-secret";
}

async function hmacSign(message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Buffer.from(signature).toString("base64url");
}

export async function createSessionToken(user: {
  id: string;
  username: string;
  role: string;
}): Promise<string> {
  const payload: SessionPayload = {
    userId: user.id,
    username: user.username,
    role: user.role,
    exp: Date.now() + SESSION_TTL_MS,
  };
  const payloadStr = JSON.stringify(payload);
  const sig = await hmacSign(payloadStr);
  return Buffer.from(JSON.stringify({ p: payloadStr, s: sig })).toString("base64url");
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const parsed = JSON.parse(Buffer.from(token, "base64url").toString()) as {
      p: string;
      s: string;
    };
    const expected = await hmacSign(parsed.p);
    if (parsed.s !== expected) return null;

    const payload = JSON.parse(parsed.p) as SessionPayload;
    if (!payload.exp || payload.exp < Date.now()) return null;
    if (!payload.userId || !payload.username) return null;

    return payload;
  } catch {
    return null;
  }
}
