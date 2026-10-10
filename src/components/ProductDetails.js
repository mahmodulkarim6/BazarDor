"use client";
import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useProducts } from "@/lib/api";
import { toBn, toBnAvg, toBnPct, unitBn, unitShort } from "@/lib/bn";
import { btnGhost, cardCls, linkPrimary } from "@/lib/ui";
import { dirColor, dirIcon } from "./ChangeBadge";
import NotFoundView from "./NotFoundView";

function Loading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pt-6">
      <div className="skeleton h-5 w-64" />
      <div className="skeleton h-44 w-full rounded-2xl" />
      <div className="skeleton h-[520px] w-full rounded-2xl" />
    </div>
  );
}

function Stat({ label, value, tone, caption }) {
  return (
    <div className={`${cardCls} px-6 py-4`}>
      <p className="text-xs">{label}</p>
      <p className={`text-2xl font-bold leading-8 ${tone}`}>{value}</p>
      <p className="text-xs">{caption}</p>
    </div>
  );
}

export default function ProductDetails({ slug }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const loggedIn = !!session?.user;
  const { data: products, loading } = useProducts();

  useEffect(() => {
    if (!isPending && !loggedIn) {
    toast.error("পণ্যের বিস্তারিত দেখতে আগে সাইন ইন করুন", { id: "auth-required" });
    router.replace("/signin");
    }
  }, [isPending, loggedIn, router]);

  const product = products?.find((p) => p.slug === slug);

  const rows = useMemo(() => {
    if (!product) return [];
  return (product.markets || [])
      .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
      .sort((a, b) => a.avg - b.avg);
  }, [product]);

  if (isPending || !loggedIn || loading) return <Loading />;
  if (!product) return <NotFoundView message="এই পণ্যটি খুঁজে পাওয়া যায়নি।" />;

  const min = rows.length ? Math.min(...rows.map((m) => m.min)) : product.today;
  const max = rows.length ? Math.max(...rows.map((m) => m.max)) : product.today;
  const diff = Math.abs(product.today - product.yesterday);
  const dir = product.change.dir;
  const movement =
    dir === "up"
      ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${toBn(diff)} টাকা`
      : dir === "down"
      ? `গতকালের তুলনায় আজ দাম কমেছে · ${toBn(diff)} টাকা`
      : "গতকালের তুলনায় আজ দাম অপরিবর্তিত";

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pt-6">
      <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <Link href="/" className={linkPrimary}>
          হোম
        </Link>
        <span className="text-xs">›</span>
        <Link href={`/category/${product.category}`} className={linkPrimary}>
          {product.categoryNameBn}
        </Link>
        <span className="text-xs">›</span>
        <span>{product.nameBn}</span>
      </nav>

  <div className={`${cardCls} p-5`}>
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
    <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl">{product.image}</div>
    <div className="min-w-0 flex-1 sm:px-2">
      <h1 className="text-2xl font-bold leading-9 sm:text-3xl">{product.nameBn}</h1>
      <p className="text-sm">
    {unitBn(product.unit)} · {product.categoryNameBn}</p>
    <p className="pt-2 text-sm">{movement}</p>
    </div>
    <div className="flex shrink-0 flex-col items-center justify-center rounded-2xl bg-base-200 px-5 py-4 text-center sm:w-[118px]">
        <p className="text-sm">আজকের দাম</p>
        <p className="text-3xl font-bold leading-9">{toBn(product.today)}</p>
        <p className="text-sm">টাকা / {unitShort(product.unit)}</p>
        <p className={`mt-1 text-sm font-semibold ${dirColor(dir)}`}>
        {dirIcon(dir)} {toBnPct(dir === "flat" ? 0 : product.change.pct)}%
  </p>
  </div>
  </div>
  </div>

  <div className={`${cardCls} flex flex-col gap-6 p-5`}>
  <section className="flex flex-col gap-3">
    <h2 className="text-lg font-semibold leading-7">দামের সারসংক্ষেপ</h2>
    <div className="grid gap-3 sm:grid-cols-3">
      <Stat label="সর্বনিম্ন দাম" value={`${toBn(min)} টাকা`} tone="text-success" caption="সবচেয়ে কম দামের বাজার" />
  <Stat label="সর্বাধিক দাম" value={`${toBn(max)} টাকা`} tone="text-error" caption="সবচেয়ে বেশি দামের বাজার" />
    <Stat label="গড় দাম" value={`${toBn(product.today)} টাকা`} tone="text-primary" caption={`${unitBn(product.unit)}-এর হিসাবে`}/></div>
  </section>

  <section className="flex flex-col gap-3">
    <h2 className="text-lg font-semibold leading-7">বাজারভিত্তিক আজকের দাম</h2>
    <div className="overflow-hidden rounded-2xl border border-base-300">
    <div className="overflow-x-auto">
    <table className="w-full min-w-[560px] text-sm">
    <thead>
    <tr className="text-left font-bold">
    <th className="px-4 py-3 font-bold">বাজার</th>
        <th className="px-4 py-3 font-bold">বিভাগ</th>
        <th className="px-4 py-3 text-right font-bold">সর্বনিম্ন</th>
        <th className="px-4 py-3 text-right font-bold">সর্বাধিক</th>
        <th className="px-4 py-3 text-right font-bold">গড়</th>
  </tr></thead>

  <tbody>
    {rows.map((m, i) => (
      <tr key={m.market} className={i % 2 === 1 ? "bg-base-200" : ""}>
        <td className="px-4 py-3 font-medium">{m.market}</td>
        <td className="px-4 py-3">{m.division}</td>
        <td className="px-4 py-3 text-right">{toBn(m.min)} টাকা</td>
        <td className="px-4 py-3 text-right">{toBn(m.max)} টাকা</td>
        <td className="px-4 py-3 text-right font-semibold">{toBnAvg(m.avg)} টাকা</td>
</tr>
))}
    </tbody>
  </table>
</div>
</div>
</section>
</div>

<div>
<Link href={`/category/${product.category}`} className={btnGhost}>
  {product.categoryIcon} সব {product.categoryNameBn}</Link>
      </div>
    </div>
  );
}