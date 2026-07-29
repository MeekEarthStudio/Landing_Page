# Meek Earth STUDIO

Next-generation landing page, music hub, documentary player, and nonprofit data
platform — built with Next.js (App Router), Tailwind CSS, Framer Motion, and
Google Cloud (Firebase App Hosting, Firestore, Cloud Storage, BigQuery).

## Features

- **Landing page** — eco-futuristic brand system (lime `#00E676`, electric blue `#2563EB`, slate teal surfaces) with animated page transitions.
- **Music hub** (`/music`) — email-gated stem locker with a moving-gradient player and SoundCloud-style timestamped reactions (live-synced via Firestore).
- **Documentary player** (`/documentary`) — video player with a time-synced reaction sidebar.
- **Nonprofit library** (`/library`) — searchable directory of free, rights-cleared assets for causes.
- **Dashboards** (`/dashboard/artist`, `/dashboard/nonprofit`) — fan growth, conversion, and impact analytics backed by BigQuery.
- **API routes** — `POST /api/subscribe` (lead capture → Firestore), `GET /api/stems` (token-validated GCS signed URLs), `POST /api/webhooks` (signature-verified donation webhooks).

## Local development

```bash
npm install
cp .env.example .env.local   # fill in Firebase web config
npm run dev
```

The app runs fully in **demo mode** without any GCP credentials — players,
reactions, the email gate, and dashboards all work with local/simulated data.
Wiring in real credentials switches components to live Firestore data
automatically.

## GCP setup

Enable these APIs in the [GCP Console](https://console.cloud.google.com/):

| API | Identifier | Used for |
| --- | --- | --- |
| Firebase App Hosting | `apphosting.googleapis.com` | Deploying this Next.js app |
| Cloud Firestore | `firestore.googleapis.com` | Leads, reactions, library data |
| Cloud Run Functions | `cloudfunctions.googleapis.com` | Serverless automation |
| Cloud Storage | `storage.googleapis.com` | Stems, 4K video, PDF toolkits |
| BigQuery | `bigquery.googleapis.com` | Fan & impact analytics |
| Google Analytics Data | `analyticsdata.googleapis.com` | GA4 engagement metrics |
| Secret Manager | `secretmanager.googleapis.com` | API keys (ConvertKit, Stripe, …) |
| Cloud Build | `cloudbuild.googleapis.com` | CI/CD container builds |

### Secrets

```bash
echo -n "your-key" | gcloud secrets create CONVERTKIT_API_KEY --data-file=-
echo -n "your-key" | gcloud secrets create STRIPE_WEBHOOK_SECRET --data-file=-
echo -n "your-key" | gcloud secrets create SENDGRID_API_KEY --data-file=-
```

Grant the App Hosting service account `roles/secretmanager.secretAccessor`.
Secrets are referenced in [apphosting.yaml](apphosting.yaml).

## Deployment

1. **Connect GitHub** — in the Firebase Console, create an App Hosting backend
   and connect this repository. Pushes to `main` build and deploy automatically
   (the [CI workflow](.github/workflows/deploy-firebase.yml) gates deploys with
   a build check and publishes Firestore/Storage rules).
2. **Hostinger DNS** — point the root domain (A records) and `www` (CNAME) at
   the Firebase Hosting endpoints shown in the Firebase Console under
   *App Hosting → Custom domains*.
3. **Firestore rules** — locked down by default: subscriber emails are never
   client-readable; reactions allow constrained public creates only. See
   [firestore.rules](firestore.rules).

## Project structure

```
app/                  Pages (App Router) + API routes
components/           Brand logo, players, email gate, library grid, analytics
lib/                  Firebase client/admin, BigQuery, GCS signed URLs, animations
apphosting.yaml       Firebase App Hosting runtime + secret bindings
firestore.rules       Database security rules
.github/workflows/    CI build check + rules deploy
```

## Data model (Firestore)

```
artifacts/{appId}/public/data/
├── subscribers/{token}        email, sourceCategory, createdAt   (server-only)
├── media_reactions/{id}       mediaId, timeSeconds, comment      (public read/create)
├── nonprofit_library/{id}     title, fileUrl, category           (public read)
└── donation_events/{id}       type, data, receivedAt             (server-only)
```
