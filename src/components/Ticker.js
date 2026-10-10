"use client";
import { useProducts } from "@/lib/api";
import { toBn, toBnPct, unitShort } from "@/lib/bn";
import { dirColor, dirIcon } from "./ChangeBadge";

export default function Ticker() {
  const { data } = useProducts();

  if (!data) {
    return (
      <div className="h-[37px] border-b border-base-300 bg-base-100">
        <div className="skeleton mx-auto h-full w-full rounded-none" />
      </div>
    );
  }

  const items = data.map((p) => (
    <span key={p.id} className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap px-4 text-sm">
      <span>{p.image}</span>
      <span className="font-medium">{p.nameBn}</span>
      <span>
        {toBn(p.today)} টাকা/{unitShort(p.unit)}
      </span>
      <span className={`font-semibold ${dirColor(p.change.dir)}`}>
        {dirIcon(p.change.dir)} {toBnPct(p.change.dir === "flat" ? 0 : p.change.pct)}%
      </span>
    </span>
  ));

  return (
    <div className="marquee overflow-hidden border-b border-base-300 bg-base-100" aria-label="আজকের দামের তালিকা">
    <div className="marquee-track">
      <div className="flex">{items}</div>
      <div className="flex" aria-hidden="true">
    {items}</div>
    </div>
  </div>
  );
}
