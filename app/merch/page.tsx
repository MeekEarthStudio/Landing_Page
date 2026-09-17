import { ArrowUpRight } from "lucide-react";
import MerchGallery from "@/components/MerchGallery";
import { ETSY_SHOP_URL, MERCH_PRODUCTS } from "@/lib/merch";

export const metadata = {
  title: "Merch — Meek Earth STUDIO",
  description:
    "After God’s Own Heart tees from Meek Earth Studio — shop black forest and navy water on Etsy.",
};

export default function MerchPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 pb-28">
      <header className="mb-14 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
          Shop
        </p>
        <h1 className="text-4xl font-bold text-brand-ink sm:text-5xl">Merch</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-brand-slate">
          After God&apos;s Own Heart. Front mark: You Met a Man. Back print with a forest or
          water earth. Sold on Etsy.
        </p>
        <a
          href={ETSY_SHOP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-lime px-8 py-4 font-semibold text-brand-deep shadow-lg shadow-brand-lime/25 transition hover:brightness-110"
        >
          Shop the Etsy store <ArrowUpRight size={18} />
        </a>
      </header>

      <div className="space-y-16">
        {MERCH_PRODUCTS.map((product) => (
          <article
            key={product.id}
            className="grid items-start gap-8 rounded-3xl border border-brand-slate/15 bg-white p-6 shadow-sm md:grid-cols-2 md:p-8"
          >
            <MerchGallery photos={product.photos} />
            <div className="flex flex-col md:pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
                {product.color}
              </p>
              <h2 className="mt-2 font-serif text-3xl text-brand-ink">{product.name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-brand-slate">{product.blurb}</p>
              <a
                href={ETSY_SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border-2 border-brand-blue px-6 py-3 font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white"
              >
                Buy on Etsy <ArrowUpRight size={16} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
