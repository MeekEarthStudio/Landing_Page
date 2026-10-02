export const TUTORIAL = [
  {
    n: "1",
    title: "Sign in (Welcome)",
    body: "On iPhone, tap Sign in with Apple. The app does not ask Apple for your email or name. Privacy Policy and Terms of Service are linked on this screen.",
  },
  {
    n: "2",
    title: "Home hub — “Choose a portal”",
    body: "This is not a social feed. Nothing you write is posted for other people. The account icon (top left) opens Steward Account: your plan, Plans, Manage Subscription, Privacy / Terms, Sign Out, and Delete Account. One large card: Gratitude Journal. Under Also in your ledger: Giving and Kindness. Milestones marks a long faithfulness — it is not a game. Worship music is an official Spotify embed. Below it you may optionally join a monthly concert, music, and devotionals letter (Kit). That address is not stored in your journal.",
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
    title: "Plans, Restore, and Manage Subscription",
    body: "Open Plans from Account, from a “limit reached” prompt, or when an unpaid feature asks you to upgrade. Digital goods use Apple In-App Purchase only. Pro is $6.99/month. Tap Restore Purchases on the paywall if you already paid on this Apple ID. Tap Manage Subscription in Account or on Plans to cancel or change auto-renew (or use iPhone Settings → your name → Subscriptions). Video Pro is no longer offered; an existing Video Pro subscription still unlocks unlimited logs and documents until you cancel it.",
  },
  {
    n: "7",
    title: "Sign out or delete your account",
    body: "Sign out: Home → account icon → Sign Out. Delete account: Home → account icon → Delete Account. This permanently removes your journal from this iPhone and from your private iCloud copy. It cannot be undone. Deleting the journal does not cancel an Apple subscription — cancel with Manage Subscription. After you sign in again, use Restore Purchases to attach an uncancelled Pro plan. Deleting the journal also does not unsubscribe you from the Kit mailing list.",
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
    a: "No. There is no public feed, no follows, and no messaging other users. Entries stay on this iPhone and in your private iCloud.",
  },
  {
    id: "which-sign-in",
    q: "Which sign-in should I use?",
    a: "On iPhone, Sign in with Apple. We do not collect your email.",
  },
  {
    id: "apple-sign-in-cancelled",
    q: "Sign in with Apple was cancelled / did nothing.",
    a: "Dismissing the Apple sheet is a cancel. Try again, and confirm the iPhone is signed into an Apple ID (Settings → your name). For sandbox testing, set Settings → App Store → Sandbox Account before opening the app.",
  },
  {
    id: "where-are-plans",
    q: "Where do I find Plans?",
    a: "Account icon → Plans, or any screen that says you have reached a free limit.",
  },
  {
    id: "manage-subscription",
    q: "How do I manage my subscription?",
    a: "Account icon → Manage Subscription, or Plans → Manage Subscription.",
  },
  {
    id: "upload-receipt",
    q: "Why can’t I upload a receipt photo?",
    a: "Upload Document is a Pro feature. Free accounts can still Enter Receipt by typing the gift (up to 15 giving entries). Camera and photo access are only for attaching your own receipts.",
  },
  {
    id: "location-permission",
    q: "Why did the app ask for location?",
    a: "Good Samaritan does not track live GPS. Some receipt photos already store location in the image, and a photo-picker library requires that notice.",
  },
  {
    id: "fifteen-entry-limit",
    q: "I hit a 15-entry limit.",
    a: "Free tier caps giving, kindness, and gratitude separately at 15 each. Upgrade to Pro for unlimited logs in those categories.",
  },
  {
    id: "paid-still-free",
    q: "I paid but still see Free.",
    a: "Open Plans → Restore Purchases, stay signed in, and wait a moment. Purchases are confirmed by Apple on this device.",
  },
  {
    id: "cancel-subscription",
    q: "How do I cancel a subscription?",
    a: "Account → Manage Subscription, or iPhone Settings → your name → Subscriptions. Deleting the Good Samaritan journal does not cancel Apple billing.",
  },
  {
    id: "refund",
    q: "Can I get a refund in the app?",
    a: "No. Apple In-App Purchases are refunded through Apple.",
  },
  {
    id: "tax-cpa",
    q: "Does this file my taxes?",
    a: "No. You are responsible for verifying amounts, 501(c)(3) status, and receipts before any filing. Export is a copy of your log, not a filed return.",
  },
  {
    id: "age-limit",
    q: "Is there an age limit?",
    a: "The app is not directed at children under 13. We do not knowingly collect personal information from children under 13.",
  },
];

export const HELP_CHECKS = [
  "Whether you are on iPhone",
  "What you were trying to do",
  "What happened, including any error text you saw",
];

export const FAQ_IDS = FAQ.map((item) => item.id);
export const FAQ_STORAGE_KEY = "gs-support-faq-read-v3";
