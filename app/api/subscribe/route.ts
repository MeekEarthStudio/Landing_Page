import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getAdminDb, PUBLIC_DATA_PATH } from "@/lib/firebaseAdmin";
import { getClientIp, rateLimit, tooManyRequests } from "@/lib/rateLimit";
import { addKitSubscriber } from "@/lib/kit";

const VALID_CATEGORIES = ["music", "documentary", "nonprofit", "blog"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Handles email sign-ups → Firestore subscribers collection. */
export async function POST(req: Request) {
  // A human signs up once or twice; anything faster is a bot.
  const limited = await rateLimit({
    name: "subscribe",
    id: getClientIp(req),
    limit: 5,
    windowSeconds: 60,
  });
  if (!limited.ok) return tooManyRequests(limited);

  let body: { email?: string; sourceCategory?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const sourceCategory = body.sourceCategory ?? "music";

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }
  if (!VALID_CATEGORIES.includes(sourceCategory as (typeof VALID_CATEGORIES)[number])) {
    return NextResponse.json({ error: "Invalid source category" }, { status: 400 });
  }

  const token = randomUUID();

  try {
    const db = getAdminDb();
    await db.collection(`${PUBLIC_DATA_PATH}/subscribers`).doc(token).set({
      email,
      sourceCategory,
      createdAt: new Date(),
    });
  } catch (err) {
    // No GCP credentials in local dev — allow the flow to continue so the
    // front-end unlock experience still works. Log for visibility.
    console.warn("[subscribe] Firestore unavailable, issuing local token:", err);
  }

  // Sync to Kit (ConvertKit) — non-fatal if unavailable.
  const syncedToKit = await addKitSubscriber(email);

  return NextResponse.json({ ok: true, token, syncedToKit });
}
