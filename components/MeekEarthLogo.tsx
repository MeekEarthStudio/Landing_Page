import Link from "next/link";

/**
 * Brand logo: leaf-orbit earth mark in lime/blue, wordmark with
 * serif-accent "STUDIO" per the brand system.
 */
export default function MeekEarthLogo({ size = 40 }: { size?: number }) {
  return (
    <Link href="/" className="flex items-center gap-3 group" aria-label="Meek Earth STUDIO home">
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Earth core */}
        <circle cx="24" cy="24" r="14" fill="#0F2922" />
        <circle cx="24" cy="24" r="14" stroke="#00E676" strokeWidth="2" />
        {/* Continents hint */}
        <path
          d="M17 20c2-3 6-4 9-2s2 6 5 7c-1 4-5 7-9 6s-7-7-5-11z"
          fill="#00E676"
          opacity="0.85"
        />
        {/* Orbit ring */}
        <ellipse
          cx="24"
          cy="24"
          rx="21"
          ry="8.5"
          stroke="#2563EB"
          strokeWidth="2"
          transform="rotate(-24 24 24)"
        />
        {/* Orbit satellite leaf */}
        <circle cx="42" cy="15" r="3.5" fill="#00FF66" />
      </svg>
      <span className="leading-tight">
        <span className="block text-lg font-bold tracking-tight text-brand-ink group-hover:text-brand-blue transition-colors">
          Meek Earth
        </span>
        <span className="block font-serif text-xs tracking-[0.35em] text-brand-slate uppercase">
          Studio
        </span>
      </span>
    </Link>
  );
}
