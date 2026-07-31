import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb, PUBLIC_DATA_PATH } from "@/lib/firebaseAdmin";
import { getClientIp, rateLimit, tooManyRequests } from "@/lib/rateLimit";

const VALID_TYPES = ["play", "reaction", "read"] as const;
type EventType = (typeof VALID_TYPES)[number];
const ID_RE = /^[a-z0-9_-]{1,64}$/i;

/**
 * Records a site event (song play, reaction posted, blog post read)
 * into per-media counters. Fire-and-forget from the client; always
 * non-fatal — analytics must never break the listening experience.
 */
export async function POST(req: Request) {
  const limited = await rateLimit({
    name: "track",
    id: getClientIp(req),
    limit: 60,
    windowSeconds: 60,
  });
  if (!limited.ok) return tooManyRequests(limited);

  let body: { type?: string; mediaId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const type = body.type as EventType;
  const mediaId = body.mediaId ?? "";
  if (!VALID_TYPES.includes(type) || !ID_RE.test(mediaId)) {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }

  const monthKey = new Date().toISOString().slice(0, 7); // e.g. "2026-07"

  try {
    const db = getAdminDb();
    const ref = db.doc(`${PUBLIC_DATA_PATH}/site_stats/${mediaId}`);
    if (type === "play") {
      await ref.set(
        {
          plays: FieldValue.increment(1),
          monthlyPlays: { [monthKey]: FieldValue.increment(1) },
          updatedAt: new Date(),
        },
        { merge: true },
      );
    } else if (type === "reaction") {
      await ref.set(
        { reactions: FieldValue.increment(1), updatedAt: new Date() },
        { merge: true },
      );
    } else {
      await ref.set(
        {
          reads: FieldValue.increment(1),
          monthlyReads: { [monthKey]: FieldValue.increment(1) },
          updatedAt: new Date(),
        },
        { merge: true },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    // Stats store not enabled yet — swallow so playback is unaffected.
    console.warn("[track] stats store unavailable:", err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false });
  }
}
