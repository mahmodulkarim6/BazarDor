import Link from "next/link";
import ChangeBadge from "./ChangeBadge";
import { toBn, unitBn } from "@/lib/bn";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.slug}`} className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-4 transition hover:border-primary hover:shadow-sm">
  <div className="flex items-center gap-3">
  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-2xl">{product.image}</div>
  <div className="min-w-0">
  <h3 className="truncate text-base font-semibold leading-6">{product.nameBn}</h3>
    <p className="text-xs leading-4">{unitBn(product.unit)}</p></div>
    </div>
    <div className="flex items-end justify-between gap-2">
    <div>
    <p className="text-xs leading-4">আজকের দাম</p>
    <p className="text-xl font-bold leading-7">{toBn(product.today)} টাকা</p>
</div>
<ChangeBadge change={product.change} />
  </div>
    </Link>
  );
}