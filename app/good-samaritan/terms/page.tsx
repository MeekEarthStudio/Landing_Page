import Link from "next/link";
import { GS_PRIVACY_PATH, GS_SUPPORT_EMAIL } from "@/lib/goodSamaritan";
import { LegalPage, LegalSection } from "@/components/GoodSamaritanLegal";

export const metadata = {
  title: "Terms of Service — Good Samaritan",
  description:
    "Terms for the Good Samaritan iPhone journal: Sign in with Apple, on-device and private iCloud storage, and Pro at $6.99/month via Apple.",
};

export default function GoodSamaritanTermsPage() {
  return (
    <LegalPage
      kicker="Legal"
      title="Terms of Service"
      meta={
        <>
          Effective 29 September 2026 · Support:{" "}
          <a
            href={`mailto:${GS_SUPPORT_EMAIL}`}
            className="font-semibold text-brand-blue hover:underline"
          >
            {GS_SUPPORT_EMAIL}
          </a>
        </>
      }
    >
      <p className="mt-6 text-sm leading-relaxed text-brand-slate">
        These Terms describe the iOS app. They are a product disclosure, not legal, tax, medical, or
        pastoral advice. Privacy:{" "}
        <Link href={GS_PRIVACY_PATH} className="font-semibold text-brand-blue hover:underline">
          Privacy Policy
        </Link>
        .
      </p>

      <LegalSection title="1. Scope">
        <p>
          Good Samaritan is a personal stewardship journal (giving, service, gratitude, paid-tier
          documents). Bundle ID{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">
            net.meekearthstudio.goodsamaritan
          </code>
          . StoreKit 2 billing. Sign in with Apple only (no email collected). The web PWA is retired
          as of 27 October 2026. You verify receipts and filings.
        </p>
      </LegalSection>

      <LegalSection title="2. Accounts">
        <p>
          Sign in with Apple uses Apple’s user identifier. Journals live on device and in your
          private iCloud. Delete in-app: Home → account icon → Delete Account. An optional
          mailing-list signup on the hub sends the address you type to Kit; that is not part of Sign
          in with Apple.
        </p>
      </LegalSection>

      <LegalSection title="3. Billing">
        <p>
          Apple is the merchant of record. Pro is $6.99/mo US via StoreKit 2 (product ID{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">
            net.meekearthstudio.goodsamaritan.pro.monthly.699
          </code>
          ). Free: 15 logs per category. Manage or cancel in the app (Account → Manage Subscription,
          or Plans) or in iPhone Settings → Apple ID → Subscriptions. The PWA/Stripe path is retired.
        </p>
      </LegalSection>

      <LegalSection title="4. Account deletion">
        <p>
          Delete Account wipes the on-device journal and private iCloud copy. It does not cancel an
          Apple subscription.
        </p>
      </LegalSection>

      <LegalSection title="5. Restore Purchases">
        <p>
          If you still have an uncancelled Apple subscription, sign in and tap Restore Purchases on
          the paywall.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
