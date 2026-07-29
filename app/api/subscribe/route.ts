import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getAdminDb, PUBLIC_DATA_PATH } from "@/lib/firebaseAdmin";

const VALID_CATEGORIES = ["music", "documentary", "nonprofit"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Handles email sign-ups → Firestore subscribers collection. */
export async function POST(req: Request) {
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

  return NextResponse.json({ ok: true, token });
}
