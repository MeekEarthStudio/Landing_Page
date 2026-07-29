// BigQuery Node.js SDK initialization (server-only).
// Uses Application Default Credentials in production.
import "server-only";
import { BigQuery } from "@google-cloud/bigquery";

let client: BigQuery | null = null;

export function getBigQuery(): BigQuery {
  if (!client) {
    client = new BigQuery({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }
  return client;
}

export const ANALYTICS_DATASET = process.env.BIGQUERY_DATASET ?? "meek_earth_analytics";

/** Run a query against the analytics dataset; returns rows or [] on failure. */
export async function runAnalyticsQuery<T = Record<string, unknown>>(sql: string): Promise<T[]> {
  try {
    const [rows] = await getBigQuery().query({ query: sql });
    return rows as T[];
  } catch (err) {
    console.error("[bigquery] query failed:", err);
    return [];
  }
}
