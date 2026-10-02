import Link from "next/link";
import { GS_SUPPORT_EMAIL, GS_TERMS_PATH } from "@/lib/goodSamaritan";
import { LegalPage, LegalSection } from "@/components/GoodSamaritanLegal";

export const metadata = {
  title: "Privacy Policy — Good Samaritan",
  description:
    "How Good Samaritan handles Sign in with Apple, on-device journals, private iCloud, StoreKit, and the optional Kit mailing list.",
};

export default function GoodSamaritanPrivacyPage() {
  return (
    <LegalPage
      kicker="Legal"
      title="Privacy Policy"
      meta={
        <>
          Last updated September 29, 2026 · Meek Earth Studio · Support:{" "}
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
        This policy describes the <strong className="font-semibold text-brand-ink">iOS App Store app</strong>{" "}
        (bundle ID <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">net.meekearthstudio.goodsamaritan</code>
        ). The web PWA is retired. This is a product disclosure, not legal advice.
      </p>

      <LegalSection title="1. Who we are">
        <p>
          Good Samaritan is a Christian stewardship journal: giving, service, and gratitude logs;
          optional documents on Pro. It is not a CPA, tax advisor, law firm, medical provider, or
          clergy substitute.
        </p>
      </LegalSection>

      <LegalSection title="2. Information we collect">
        <p>
          Sign in with Apple does <strong className="font-semibold text-brand-ink">not</strong> collect
          your email. The app requests no email or name scopes; identity is Apple’s user identifier
          stored on the device.
        </p>
        <p>
          If you opt in on the hub, the address you type is sent to{" "}
          <strong className="font-semibold text-brand-ink">Kit (kit.com)</strong> for the monthly
          concert, music, and devotionals list. We do not store that address in your journal, private
          iCloud, or any database we operate. Unsubscribe from the footer of any Kit letter. Deleting
          your Good Samaritan journal does not remove you from Kit.
        </p>
        <p>
          Logs and optional Pro documents stay on the device and in your private iCloud (CloudKit). We
          do not operate Cloud SQL for your journal after 27 October 2026. Purchase history is Apple
          transaction identifiers for StoreKit. We do not store payment card numbers.
        </p>
        <p>
          We do not collect location, analytics SDK data, or advertising identifiers. We do not sell
          personal information.
        </p>
      </LegalSection>

      <LegalSection title="3. How we use it">
        <p>
          To keep you signed in with Apple, restore your journal from private iCloud, enforce the free
          log cap, honor StoreKit Pro, and (only if you opt in) send your typed address to Kit for the
          mailing list.
        </p>
      </LegalSection>

      <LegalSection title="4. Third parties">
        <p>
          Apple Sign in with Apple, StoreKit 2 / App Store, Apple iCloud / CloudKit (your private
          database), and Kit.com if you join the mailing list. No Stripe in the iOS binary.
        </p>
      </LegalSection>

      <LegalSection title="5. Account deletion">
        <p>
          Home → account icon → Delete Account wipes the on-device journal and the private iCloud
          copy. That does not cancel an Apple subscription. Cancel with Manage Subscription in the
          account menu or Plans sheet, or in Settings → Apple ID → Subscriptions.
        </p>
      </LegalSection>

      <LegalSection title="6. Children">
        <p>Good Samaritan is not directed at children under 13.</p>
      </LegalSection>

      <LegalSection title="7. Contact">
        <p>
          Questions:{" "}
          <a
            href={`mailto:${GS_SUPPORT_EMAIL}`}
            className="font-semibold text-brand-blue hover:underline"
          >
            {GS_SUPPORT_EMAIL}
          </a>
          . Also read the{" "}
          <Link href={GS_TERMS_PATH} className="font-semibold text-brand-blue hover:underline">
            Terms of Service
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
