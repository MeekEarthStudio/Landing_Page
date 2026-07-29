import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { getAdminDb, PUBLIC_DATA_PATH } from "@/lib/firebaseAdmin";
import { getClientIp, rateLimit, tooManyRequests } from "@/lib/rateLimit";

/**
 * Handles payment/donation webhooks (e.g. Stripe).
 * Verifies the HMAC signature before recording the event.
 * Generous limit — real payment providers batch-retry, but signature
 * forgery attempts shouldn't get unlimited HMAC computations.
 */
export async function POST(req: Request) {
  const limited = await rateLimit({
    name: "webhooks",
    id: getClientIp(req),
    limit: 120,
    windowSeconds: 60,
  });
  if (!limited.ok) return tooManyRequests(limited);

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature") ?? req.headers.get("x-webhook-signature");

  if (!secret) {
    console.warn("[webhooks] STRIPE_WEBHOOK_SECRET not set — rejecting");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 503 });
  }
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // Simple HMAC check; swap for stripe.webhooks.constructEvent when the
  // Stripe SDK is added.
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  const provided = Buffer.from(signature);
  const wanted = Buffer.from(expected);
  if (provided.length !== wanted.length || !timingSafeEqual(provided, wanted)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: { type?: string; data?: unknown };
  try {
    event = JSON.parse(payload);
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    const db = getAdminDb();
    await db.collection(`${PUBLIC_DATA_PATH}/donation_events`).add({
      type: event.type ?? "unknown",
      data: event.data ?? null,
      receivedAt: new Date(),
    });
  } catch (err) {
    console.error("[webhooks] failed to record event:", err);
    return NextResponse.json({ error: "Failed to record event" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
