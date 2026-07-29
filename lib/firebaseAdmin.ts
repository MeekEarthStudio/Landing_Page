// Server-side Firebase Admin SDK config.
// On Firebase App Hosting / Cloud Run this uses Application Default
// Credentials automatically; locally, set GOOGLE_APPLICATION_CREDENTIALS.
import "server-only";
import { cert, getApps, initializeApp, applicationDefault, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

export const APP_ID = process.env.NEXT_PUBLIC_APP_ID ?? "meek-earth-studio";
export const PUBLIC_DATA_PATH = `artifacts/${APP_ID}/public/data`;

let adminApp: App | null = null;

function getAdminApp(): App {
  if (adminApp) return adminApp;
  if (getApps().length) {
    adminApp = getApps()[0];
    return adminApp;
  }
  const credsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  adminApp = initializeApp({
    credential: credsPath ? cert(credsPath) : applicationDefault(),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
  return adminApp;
}

export function getAdminDb(): Firestore {
  return getFirestore(getAdminApp());
}
