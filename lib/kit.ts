// Kit (ConvertKit) v4 API integration.
// https://developers.kit.com/v4
import "server-only";

const KIT_API_BASE = "https://api.kit.com/v4";

/**
 * Create (or upsert) a subscriber in Kit.
 *
 * The API key travels only in the X-Kit-Api-Key header — never in the
 * URL or payload. Returns true on success; failures are logged and
 * non-fatal so a Kit outage can't break the site's email gate.
 */
export async function addKitSubscriber(email: string): Promise<boolean> {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  if (!apiKey) {
    console.warn("[kit] CONVERTKIT_API_KEY not set — skipping Kit sync");
    return false;
  }

  try {
    const res = await fetch(`${KIT_API_BASE}/subscribers`, {
      method: "POST",
      headers: {
        "X-Kit-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_address: email }),
    });

    if (!res.ok) {
      console.error("[kit] subscriber create failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[kit] request failed:", err);
    return false;
  }
}
