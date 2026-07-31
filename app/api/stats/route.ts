import { NextResponse } from "next/server";
import { getAdminDb, PUBLIC_DATA_PATH } from "@/lib/firebaseAdmin";
import { getClientIp, rateLimit, tooManyRequests } from "@/lib/rateLimit";

export interface StatItem {
  id: string;
  plays: number;
  playsThisMonth: number;
  reactions: number;
  reads: number;
  readsThisMonth: number;
}

/** Aggregated site stats for the dashboard. */
export async function GET(req: Request) {
  const limited = await rateLimit({
    name: "stats",
    id: getClientIp(req),
    limit: 30,
    windowSeconds: 60,
  });
  if (!limited.ok) return tooManyRequests(limited);

  const monthKey = new Date().toISOString().slice(0, 7);

  try {
    const db = getAdminDb();
    const snap = await db.collection(`${PUBLIC_DATA_PATH}/site_stats`).get();
    const items: StatItem[] = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        plays: data.plays ?? 0,
        playsThisMonth: data.monthlyPlays?.[monthKey] ?? 0,
        reactions: data.reactions ?? 0,
        reads: data.reads ?? 0,
        readsThisMonth: data.monthlyReads?.[monthKey] ?? 0,
      };
    });
    return NextResponse.json({ available: true, month: monthKey, items });
  } catch (err) {
    console.warn("[stats] stats store unavailable:", err instanceof Error ? err.message : err);
    return NextResponse.json({ available: false, month: monthKey, items: [] });
  }
}
