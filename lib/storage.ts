// Cloud Storage signed-URL generator utilities (server-only).
import "server-only";
import { Storage } from "@google-cloud/storage";

let storage: Storage | null = null;

function getStorage(): Storage {
  if (!storage) {
    storage = new Storage({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }
  return storage;
}

export const ASSETS_BUCKET =
  process.env.GCS_ASSETS_BUCKET ?? "meek-earth-email-capture-94556.firebasestorage.app";

/**
 * Generate a short-lived signed URL for a private object
 * (unreleased stems, 4K documentary masters, nonprofit toolkits).
 */
export async function getSignedDownloadUrl(
  objectPath: string,
  expiresInMinutes = 15,
): Promise<string> {
  const [url] = await getStorage()
    .bucket(ASSETS_BUCKET)
    .file(objectPath)
    .getSignedUrl({
      version: "v4",
      action: "read",
      expires: Date.now() + expiresInMinutes * 60 * 1000,
    });
  return url;
}
