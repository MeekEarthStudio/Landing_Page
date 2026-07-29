// Per-IP fixed-window rate limiting for API routes.
//
// Default backend is in-memory, which is per-Cloud-Run-instance — with
// maxInstances: 4 a determined attacker gets at most 4× the limit, which
// is plenty for launch. If UPSTASH_REDIS_REST_URL/TOKEN are set, the
// limiter transparently switches to a shared Redis window across all
// instances (Upstash free tier is sufficient).
import "server-only";
import { NextResponse } from "next/server";

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 10_000;

export interface RateLimitOptions {
  /** Route name used to namespace the counter, e.g. "subscribe". */
  name: string;
  /** Client identifier — usually the IP from getClientIp(). */
  id: string;
  /** Max requests allowed per window. */
  limit: number;
  /** Window length in seconds. */
  windowSeconds: number;
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/** First hop of x-forwarded-for — set reliably by Cloud Run / App Hosting. */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

async function upstashCount(key: string, windowSeconds: number): Promise<number | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, String(windowSeconds), "NX"],
      ]),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Array<{ result?: unknown }>;
    return typeof data?.[0]?.result === "number" ? data[0].result : null;
  } catch (err) {
    // Redis being down must never take the API down with it.
    console.warn("[rateLimit] Upstash unreachable, falling back to memory:", err);
    return null;
  }
}

function memoryCount(key: string, windowSeconds: number): { count: number; resetAt: number } {
  const now = Date.now();

  // Opportunistic pruning so the map can't grow unbounded under attack.
  if (buckets.size >= MAX_BUCKETS) {
    for (const [k, b] of buckets) {
      if (b.resetAt <= now) buckets.delete(k);
    }
    // Still full of live buckets (mass distributed attack): drop oldest.
    if (buckets.size >= MAX_BUCKETS) {
      const oldest = buckets.keys().next().value;
      if (oldest) buckets.delete(oldest);
    }
  }

  const existing = buckets.get(key);
  if (existing && existing.resetAt > now) {
    existing.count += 1;
    return existing;
  }
  const fresh = { count: 1, resetAt: now + windowSeconds * 1000 };
  buckets.set(key, fresh);
  return fresh;
}

/** Count a request against the window; ok=false means respond with 429. */
export async function rateLimit(opts: RateLimitOptions): Promise<RateLimitResult> {
  const windowIndex = Math.floor(Date.now() / (opts.windowSeconds * 1000));
  const key = `rl:${opts.name}:${opts.id}:${windowIndex}`;

  const shared = await upstashCount(key, opts.windowSeconds);
  let count: number;
  let resetAt: number;

  if (shared !== null) {
    count = shared;
    resetAt = (windowIndex + 1) * opts.windowSeconds * 1000;
  } else {
    const bucket = memoryCount(key, opts.windowSeconds);
    count = bucket.count;
    resetAt = bucket.resetAt;
  }

  const retryAfterSeconds = Math.max(1, Math.ceil((resetAt - Date.now()) / 1000));
  return {
    ok: count <= opts.limit,
    remaining: Math.max(0, opts.limit - count),
    retryAfterSeconds,
  };
}

/** Standard 429 response with a Retry-After header. */
export function tooManyRequests(result: RateLimitResult): NextResponse {
  return NextResponse.json(
    { error: "Too many requests — please wait a moment and try again." },
    {
      status: 429,
      headers: { "Retry-After": String(result.retryAfterSeconds) },
    },
  );
}
