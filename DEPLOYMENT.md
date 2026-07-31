# Deploying Meek Earth STUDIO to Google Cloud

The app deploys via **Firebase App Hosting** (which runs it on Cloud Run behind
the scenes). Everything in the repo is ready — the steps below are the
one-time cloud setup you do in a terminal and the Firebase Console.

## 0. Prerequisites (one-time installs)

```bash
npm install -g firebase-tools
```

Optional but useful for Secret Manager:
[Install the gcloud CLI](https://cloud.google.com/sdk/docs/install).

## 1. Firebase project — `meek-earth-email-capture-94556`

The GCP project already exists, and `.firebaserc` in this repo already points
the Firebase CLI at it. If the project doesn't have Firebase enabled yet
(i.e. it doesn't appear at https://console.firebase.google.com), add it:

```bash
firebase login
firebase projects:addfirebase meek-earth-email-capture-94556
```

## 2. Enable the GCP APIs

In [GCP Console → APIs & Services](https://console.cloud.google.com/apis/library)
for the same project, enable:

`apphosting.googleapis.com`, `firestore.googleapis.com`,
`cloudfunctions.googleapis.com`, `storage.googleapis.com`,
`bigquery.googleapis.com`, `analyticsdata.googleapis.com`,
`secretmanager.googleapis.com`, `cloudbuild.googleapis.com`

Or with gcloud, all at once:

```bash
gcloud services enable apphosting.googleapis.com firestore.googleapis.com cloudfunctions.googleapis.com storage.googleapis.com bigquery.googleapis.com analyticsdata.googleapis.com secretmanager.googleapis.com cloudbuild.googleapis.com --project meek-earth-email-capture-94556
```

## 3. Storage + streaming permissions

Audio/video files live in the Firebase default bucket
(`meek-earth-email-capture-94556.firebasestorage.app`) — upload via
Firebase Console → **Storage** → Files. The app reads the bucket name
from `GCS_ASSETS_BUCKET` in `apphosting.yaml`.

Emails are collected by Kit (ConvertKit) — **Firestore is NOT required**
for the email gate or audio playback. (The firestore.rules file in this
repo is only for the optional live-reactions feature, if it's ever
enabled later.)

Grant the App Hosting runtime permission to read the bucket and mint
signed streaming URLs (one-time):

```bash
gcloud storage buckets add-iam-policy-binding gs://meek-earth-email-capture-94556.firebasestorage.app --member=serviceAccount:firebase-app-hosting-compute@meek-earth-email-capture-94556.iam.gserviceaccount.com --role=roles/storage.objectViewer
```

```bash
gcloud services enable iamcredentials.googleapis.com --project meek-earth-email-capture-94556
```

```bash
gcloud iam service-accounts add-iam-policy-binding firebase-app-hosting-compute@meek-earth-email-capture-94556.iam.gserviceaccount.com --member=serviceAccount:firebase-app-hosting-compute@meek-earth-email-capture-94556.iam.gserviceaccount.com --role=roles/iam.serviceAccountTokenCreator
```

## 4. Store secrets in Secret Manager

```bash
echo -n "YOUR_KEY" | gcloud secrets create CONVERTKIT_API_KEY --data-file=- --project meek-earth-email-capture-94556
echo -n "YOUR_KEY" | gcloud secrets create STRIPE_WEBHOOK_SECRET --data-file=- --project meek-earth-email-capture-94556
echo -n "YOUR_KEY" | gcloud secrets create SENDGRID_API_KEY --data-file=- --project meek-earth-email-capture-94556
```

`apphosting.yaml` already references these; App Hosting will prompt you to
grant its service account access on first deploy (or grant
`roles/secretmanager.secretAccessor` manually).

## 5. GitHub repo — ✅ done

The code lives at
[github.com/MeekEarthStudio/Landing_Page](https://github.com/MeekEarthStudio/Landing_Page),
and the local repo tracks it (`origin/main`). Publishing changes is just:

```bash
git push
```

## 6. Create the App Hosting backend

Firebase Console → **App Hosting** → *Get started*:

1. Connect your GitHub account and select **MeekEarthStudio/Landing_Page**.
2. Set live branch: `main`, root directory: `/`.
3. Firebase auto-detects Next.js and reads `apphosting.yaml`.

Every push to `main` now builds (Cloud Build) and deploys automatically.

The GitHub Actions workflow in `.github/workflows/deploy-firebase.yml` runs a
build gate on every push and PR — no secrets required. (There is no rules
deploy: Firestore is unused, and the storage bucket is private with access
only through server-side signed URLs.)

## 7. Wire up the web app config

Firebase Console → Project settings → *Your apps* → add a **Web app**, then
put its config values into App Hosting environment variables (or
`apphosting.yaml`) as the `NEXT_PUBLIC_FIREBASE_*` keys listed in
`.env.example`. Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` for GA4.

## 8. Custom domain (Hostinger)

Firebase Console → App Hosting → **Custom domains** → add your domain.
In Hostinger's DNS panel, add the records Firebase shows you:
- Root domain: `A` records → Firebase IPs
- `www`: `CNAME` → the target Firebase provides

SSL provisions automatically once DNS propagates.

## Rate limiting

API routes are rate limited per IP out of the box (subscribe: 5/min,
stems: 30/min, webhooks: 120/min) using in-memory counters — see
`lib/rateLimit.ts`. Counters are per Cloud Run instance; with
`maxInstances: 4` an attacker gets at most 4× the limit.

To enforce limits globally across all instances, create a free Redis
database at [upstash.com](https://upstash.com) and set
`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` (store the token in
Secret Manager for production). The limiter switches over automatically —
no code changes.

## Verify

- Visit the `*.hosted.app` URL App Hosting gives you.
- Sign up through the email gate → check Firestore for
  `artifacts/meek-earth-studio/public/data/subscribers/…`
- Post a reaction on `/music` → appears in `media_reactions` and syncs live
  to other browsers.
