"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Music, FileText, Video, Download } from "lucide-react";
import { db, PUBLIC_DATA_PATH } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

type AssetCategory = "music" | "doc" | "video";

interface LibraryAsset {
  id: string;
  title: string;
  fileUrl: string;
  category: AssetCategory;
  description?: string;
}

const DEMO_ASSETS: LibraryAsset[] = [
  { id: "1", title: "Ocean Restoration Score", fileUrl: "#", category: "music", description: "Cinematic score, free for cause campaigns." },
  { id: "2", title: "Grant Writing Toolkit", fileUrl: "#", category: "doc", description: "Templates + budget worksheets (PDF)." },
  { id: "3", title: "Reforestation B-Roll Pack", fileUrl: "#", category: "video", description: "4K aerial forest footage, rights-cleared." },
  { id: "4", title: "Community Anthem (Stems)", fileUrl: "#", category: "music", description: "Full stem pack for remix fundraisers." },
  { id: "5", title: "Impact Report Template", fileUrl: "#", category: "doc", description: "Donor-ready annual report layout." },
  { id: "6", title: "Clean Water PSA Cut", fileUrl: "#", category: "video", description: "30s spot, broadcast safe." },
];

const CATEGORY_META: Record<AssetCategory, { icon: typeof Music; label: string }> = {
  music: { icon: Music, label: "Music" },
  doc: { icon: FileText, label: "Documents" },
  video: { icon: Video, label: "Video" },
};

/** Searchable free-asset directory for nonprofit organizations. */
export default function NonprofitLibraryGrid() {
  const [assets, setAssets] = useState<LibraryAsset[]>(DEMO_ASSETS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<AssetCategory | "all">("all");

  useEffect(() => {
    if (!db) return;
    return onSnapshot(collection(db, `${PUBLIC_DATA_PATH}/nonprofit_library`), (snap) => {
      const live = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as LibraryAsset);
      if (live.length) setAssets(live);
    });
  }, []);

  const visible = useMemo(
    () =>
      assets.filter(
        (a) =>
          (filter === "all" || a.category === filter) &&
          a.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [assets, search, filter],
  );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-slate" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search free assets…"
            className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/30"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "music", "doc", "video"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
                filter === c
                  ? "bg-brand-lime text-brand-deep"
                  : "bg-slate-100 text-brand-slate hover:bg-slate-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((asset, i) => {
          const Icon = CATEGORY_META[asset.category].icon;
          return (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-xl border border-brand-slate/15 bg-white p-5 shadow-sm transition hover:border-brand-lime hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-deep text-brand-lime">
                  <Icon size={18} />
                </span>
                <span className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-xs font-medium text-brand-blue">
                  {CATEGORY_META[asset.category].label}
                </span>
              </div>
              <h3 className="font-semibold text-brand-ink">{asset.title}</h3>
              {asset.description && (
                <p className="mt-1 text-sm text-brand-slate">{asset.description}</p>
              )}
              <a
                href={asset.fileUrl}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition group-hover:text-brand-lime"
              >
                <Download size={15} /> Free download
              </a>
            </motion.div>
          );
        })}
        {!visible.length && (
          <p className="col-span-full py-12 text-center text-brand-slate">
            No assets match your search.
          </p>
        )}
      </div>
    </div>
  );
}
