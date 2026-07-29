import NonprofitLibraryGrid from "@/components/NonprofitLibraryGrid";

export const metadata = {
  title: "Free Nonprofit Library — Meek Earth STUDIO",
  description:
    "Rights-cleared music, footage, and document toolkits — free for nonprofit organizations.",
};

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
          Give-first library
        </p>
        <h1 className="text-4xl font-bold text-brand-ink">Free Media for Nonprofits</h1>
        <p className="mt-3 max-w-xl text-brand-slate">
          Every asset here is rights-cleared and free for registered nonprofits — scores,
          b-roll, grant templates, and campaign toolkits. Take what your cause needs.
        </p>
      </header>
      <NonprofitLibraryGrid />
    </div>
  );
}
