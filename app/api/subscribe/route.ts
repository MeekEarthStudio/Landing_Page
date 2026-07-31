import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getClientIp, rateLimit, tooManyRequests } from "@/lib/rateLimit";
import { addKitSubscriber } from "@/lib/kit";

const VALID_CATEGORIES = ["music", "documentary", "nonprofit", "blog", "waitlist"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Handles email sign-ups → Kit (ConvertKit). */
export async function POST(req: Request) {
  // A human signs up once or twice; anything faster is a bot. Dual
  // windows: burst (5/min) and slow-drip (15/hour) protection.
  const ip = getClientIp(req);
  const burst = await rateLimit({ name: "subscribe", id: ip, limit: 5, windowSeconds: 60 });
  if (!burst.ok) return tooManyRequests(burst);
  const hourly = await rateLimit({ name: "subscribe-h", id: ip, limit: 15, windowSeconds: 3600 });
  if (!hourly.ok) return tooManyRequests(hourly);

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

  // Kit is the system of record for the email list.
  const syncedToKit = await addKitSubscriber(email);

  // Unlock token for the client's localStorage — gates the media UI.
  const token = randomUUID();

  return NextResponse.json({ ok: true, token, syncedToKit });
}
