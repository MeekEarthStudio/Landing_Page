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

## 1. Firebase project — `meek-earth-email-capture`

The GCP project already exists, and `.firebaserc` in this repo already points
the Firebase CLI at it. If the project doesn't have Firebase enabled yet
(i.e. it doesn't appear at https://console.firebase.google.com), add it:

```bash
firebase login
firebase projects:addfirebase meek-earth-email-capture
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
gcloud services enable apphosting.googleapis.com firestore.googleapis.com cloudfunctions.googleapis.com storage.googleapis.com bigquery.googleapis.com analyticsdata.googleapis.com secretmanager.googleapis.com cloudbuild.googleapis.com --project meek-earth-email-capture
```

## 3. Create Firestore + the assets bucket

- Firebase Console → **Firestore Database** → Create database (production mode).
- Firebase Console → **Storage**, or create the private assets bucket:

```bash
gcloud storage buckets create gs://meek-earth-assets --project meek-earth-email-capture --location us-central1 --uniform-bucket-level-access
```

Deploy the security rules and indexes from this repo:

```bash
firebase deploy --only firestore:rules,firestore:indexes,storage
```

## 4. Store secrets in Secret Manager

```bash
echo -n "YOUR_KEY" | gcloud secrets create CONVERTKIT_API_KEY --data-file=- --project meek-earth-email-capture
echo -n "YOUR_KEY" | gcloud secrets create STRIPE_WEBHOOK_SECRET --data-file=- --project meek-earth-email-capture
echo -n "YOUR_KEY" | gcloud secrets create SENDGRID_API_KEY --data-file=- --project meek-earth-email-capture
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
build gate on every push and PR — that job already works. Its second job
(deploying Firestore/Storage rules) stays red until you add two repository
secrets at
[Settings → Secrets and variables → Actions](https://github.com/MeekEarthStudio/Landing_Page/settings/secrets/actions):

- `FIREBASE_SERVICE_ACCOUNT` — a service-account JSON from the Firebase
  project (Project settings → Service accounts → Generate new private key)
- `FIREBASE_PROJECT_ID` — `meek-earth-email-capture`

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
