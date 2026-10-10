import { toBnPct } from "@/lib/bn";

export const dirColor = (dir) =>
  dir === "up" ? "text-error" : dir === "down" ? "text-success" : "text-base-content";
export const dirIcon = (dir) => (dir === "up" ? "▲" : dir === "down" ? "▼" : "—");

export default function ChangeBadge({ change }) {
  const dir = change?.dir || "flat";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-xl bg-base-200 px-2 py-1 text-xs font-semibold leading-4 ${dirColor(dir)}`}>
  <span>{dirIcon(dir)}</span>
  <span>{toBnPct(dir === "flat" ? 0 : change.pct)}%</span>
  </span>
  );
}
