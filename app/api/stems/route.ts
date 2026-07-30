import { NextResponse } from "next/server";
import { getSignedDownloadUrl } from "@/lib/storage";
import { getClientIp, rateLimit, tooManyRequests } from "@/lib/rateLimit";

/**
 * Returns a short-lived GCS signed URL for a media file in the assets
 * bucket. The email gate issues the client its token; presence of a
 * token plus rate limiting keeps casual scraping out, while the bucket
 * itself stays private (no public URLs).
 *
 *   GET /api/stems?token=<unlockToken>&file=Freedom.wav
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
  // Prevent path tricks — allow media files at the bucket root or under
  // the audio/, video/, docs/ prefixes, with a known media extension.
  if (
    !/^(?:(?:audio|video|docs)\/)?[\w\- .]+\.(?:wav|mp3|flac|mp4|mov|pdf)$/i.test(file) ||
    file.includes("..")
  ) {
    return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
  }

  try {
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
