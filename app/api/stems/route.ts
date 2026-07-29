import { NextResponse } from "next/server";
import { getAdminDb, PUBLIC_DATA_PATH } from "@/lib/firebaseAdmin";
import { getSignedDownloadUrl } from "@/lib/storage";
import { getClientIp, rateLimit, tooManyRequests } from "@/lib/rateLimit";

/**
 * Validates an email-gate token and returns a short-lived GCS signed URL
 * for a private stem file.
 *
 *   GET /api/stems?token=<subscriberToken>&file=audio/neon_horizon_stem.wav
 */
export async function GET(req: Request) {
  // Signed-URL minting costs real GCS calls — keep bots off it.
  const limited = await rateLimit({
    name: "stems",
    id: getClientIp(req),
    limit: 30,
    windowSeconds: 60,
  });
  if (!limited.ok) return tooManyRequests(limited);

  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const file = searchParams.get("file");

  if (!token || !file) {
    return NextResponse.json({ error: "token and file are required" }, { status: 400 });
  }
  // Prevent path tricks — only allow simple object paths under known prefixes.
  if (!/^(audio|video|docs)\/[\w\-./]+$/.test(file) || file.includes("..")) {
    return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
  }

  try {
    const db = getAdminDb();
    const sub = await db.doc(`${PUBLIC_DATA_PATH}/subscribers/${token}`).get();
    if (!sub.exists) {
      return NextResponse.json({ error: "Invalid or expired access token" }, { status: 403 });
    }

    const url = await getSignedDownloadUrl(file, 15);
    return NextResponse.json({ ok: true, url, expiresInMinutes: 15 });
  } catch (err) {
    console.error("[stems] failed to issue signed URL:", err);
    return NextResponse.json(
      { error: "Storage is not configured yet. Set up GCP credentials to enable downloads." },
      { status: 503 },
    );
  }
}
