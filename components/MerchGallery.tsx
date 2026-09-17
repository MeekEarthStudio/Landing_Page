"use client";

import { useState } from "react";
import Image from "next/image";
import type { MerchPhoto } from "@/lib/merch";

export default function MerchGallery({ photos }: { photos: MerchPhoto[] }) {
  const [active, setActive] = useState(0);
  const current = photos[active] ?? photos[0];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-50">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain"
          priority={active === 0}
        />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActive(index)}
            aria-pressed={index === active}
            aria-label={`Show photo ${index + 1}`}
            className={`relative aspect-square overflow-hidden rounded-lg border bg-slate-50 transition ${
              index === active
                ? "border-brand-lime ring-2 ring-brand-lime/40"
                : "border-brand-slate/15 hover:border-brand-blue"
            }`}
          >
            <Image src={photo.src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
