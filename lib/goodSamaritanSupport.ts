export const SIGN_IN = [
  { option: "Sign in with Apple", when: "iPhone (offered next to Google)" },
  { option: "Sign in with Google", when: "iPhone, Android, or the web app" },
  { option: "Sign in / Create account", when: "Email and password" },
  { option: "Reset password", when: "Sends a Firebase link to a real inbox" },
  { option: "Continue with guest email", when: "Try the app without linking Google or Apple" },
];

export const TUTORIAL = [
  {
    n: "1",
    title: "Sign in (Welcome)",
    body: "Choose Apple, Google, email and password, or guest email. Google and Apple identities that share the same email become one Good Samaritan account. Apple Hide My Email (privaterelay.appleid.com) is a separate identity unless you later sign in with a matching Google email. Privacy Policy and Terms of Service are linked on this screen.",
  },
  {
    n: "2",
    title: "Home hub — “Choose a portal”",
    body: "This is not a social feed. Nothing you write is posted for other people. The account icon (top left) opens Steward Account: your email, plan status, Privacy / Terms, Sign Out, and Delete Account. One large card: Gratitude Journal. Under Also in your ledger: Giving and Kindness. Worship music at the bottom is an official Spotify embed.",
  },
  {
    n: "3",
    title: "Record gratitude",
    body: "Tap Gratitude Journal, enter a short title (required), optionally add a prayer or reflection, choose a category (Family & Health, Provision & Stewardship, Community & Fellowship, Spiritual Growth, or Daily Mercy), then save. Free accounts can save up to 15 gratitude entries. Pro is unlimited.",
  },
  {
    n: "4",
    title: "Log a donation (Giving)",
    body: "Tap Giving. The toggle at the top switches Giving | Kindness. Tap the gold + button, choose Enter Receipt, then fill in the organization, amount, date, and whether it is a 501(c)(3). On Pro, Upload Document attaches a receipt image or PDF. You can download a ZIP of your files and export a CSV/Excel copy of your giving log. Verify every amount and 501(c)(3) checkbox against your original receipts before any tax use.",
  },
  {
    n: "5",
    title: "Log an act of kindness",
    body: "Tap Kindness (or open Giving and switch the toggle). Tap +, then Log Time for volunteer hours or Log Act for goods shared or an everyday act of mercy. Name the organization or neighbor, add a short description, and save. The Kindness view shows volunteer hours and acts logged. Free accounts can save up to 15 service-log entries.",
  },
  {
    n: "6",
    title: "Plans and Restore Purchases",
    body: "Open Plans from a “limit reached” prompt, or when an unpaid feature asks you to upgrade. On iPhone, digital goods use Apple In-App Purchase only — tap Restore Purchases if you already paid on this Apple ID, and cancel auto-renew in iPhone Settings → your name → Subscriptions. On the web app, purchases use Stripe. Manage or cancel in the Stripe Customer Portal with the Google email on the account. Video Pro and Booster are no longer offered in the paywall; an existing Video Pro subscription still unlocks unlimited logs and documents until you cancel it.",
  },
  {
    n: "7",
    title: "Sign out or delete your account",
    body: "Sign out: Home → account icon → Sign Out. Delete account: Home → account icon → Delete Account. This permanently removes your Good Samaritan data (logs, documents, entitlements) and cannot be undone. Deleting the app account does not cancel an Apple subscription — cancel in iPhone Settings → Apple ID → Subscriptions. After you create a new account, use Restore Purchases to attach an uncancelled Pro or Video Pro plan. Booster is a one-time pack and typically does not restore.",
  },
];

export const FAQ = [
  {
    id: "what-is-this-app-for",
    q: "What is this app for?",
    a: "A private record of charitable giving, acts of kindness, and gratitude to God. It is an administrative log — not a church, CPA, law firm, clinic, or ordained pastor.",
  },
  {
    id: "is-my-journal-public",
    q: "Is my journal public?",
    a: "No. There is no public feed, no follows, and no messaging other users. Entries stay on your signed-in account.",
  },
  {
    id: "which-sign-in",
    q: "Which sign-in should I use?",
    a: "Use Apple or Google if you already have those accounts. Use the same email if you want one Good Samaritan account across Apple and Google. Guest email is for trying the app; those addresses cannot receive password-reset mail.",
  },
  {
    id: "forgot-password",
    q: "I forgot my password.",
    a: "On Welcome, tap Reset password and use an inbox you can open. Guest @guest.meekearthstudio.net addresses cannot receive mail.",
  },
  {
    id: "apple-sign-in-cancelled",
    q: "Sign in with Apple was cancelled / did nothing.",
    a: "Dismissing the Apple sheet is a cancel. Try again, and confirm the iPhone is signed into an Apple ID (Settings → your name). For sandbox testing, set Settings → App Store → Sandbox Account before opening the app.",
  },
  {
    id: "where-are-plans",
    q: "Where do I find Plans?",
    a: "Steward Account, or any screen that says you have reached a free limit.",
  },
  {
    id: "upload-receipt",
    q: "Why can’t I upload a receipt photo?",
    a: "Upload Document is a Pro feature (or an existing Video Pro subscription). Free accounts can still Enter Receipt by typing the gift (up to 15 giving entries). Camera and photo access are only for attaching your own receipts.",
  },
  {
    id: "location-permission",
    q: "Why did the app ask for location?",
    a: "Good Samaritan does not track live GPS. Some receipt photos already store location in the image, and a photo-picker library requires that notice.",
  },
  {
    id: "fifteen-entry-limit",
    q: "I hit a 15-entry limit.",
    a: "Free tier caps giving, kindness, and gratitude separately at 15 each. Upgrade to Pro for unlimited logs in those categories. An existing Video Pro subscription also unlocks unlimited logs.",
  },
  {
    id: "out-of-log-space",
    q: "I ran out of log space.",
    a: "Open Plans and subscribe to Pro for unlimited logs and documents.",
  },
  {
    id: "paid-still-free",
    q: "I paid but still see Free.",
    a: "On iPhone, open Plans → Restore Purchases, stay signed in, and wait for the server to refresh entitlements. Purchases are confirmed by Apple before quotas change. On the web app, use the Stripe portal with the same email as the account.",
  },
  {
    id: "cancel-subscription",
    q: "How do I cancel a subscription?",
    a: "iPhone: Settings → your name → Subscriptions. Web: Stripe Customer Portal. Deleting the Good Samaritan account does not cancel Apple or Stripe billing.",
  },
  {
    id: "refund",
    q: "Can I get a refund in the app?",
    a: "No. Apple In-App Purchases are refunded through Apple. Stripe purchases are handled in the Stripe portal / Stripe support.",
  },
  {
    id: "tax-cpa",
    q: "Does this replace tax software or a CPA?",
    a: "No. You are responsible for verifying amounts, 501(c)(3) status, and receipts before any filing. Export is a copy of your log, not a filed return.",
  },
  {
    id: "age-limit",
    q: "Is there an age limit?",
    a: "The app is not directed at children under 13. We do not knowingly collect personal information from children under 13.",
  },
];

export const HELP_CHECKS = [
  "The email on your Good Samaritan account",
  "Whether you are on iPhone, Android, or the web app",
  "What you were trying to do",
  "What happened, including any error text you saw",
];

export const FAQ_IDS = FAQ.map((item) => item.id);
export const FAQ_STORAGE_KEY = "gs-support-faq-read-v2";
