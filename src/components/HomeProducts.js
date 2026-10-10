"use client";
import { useMemo } from "react";
import { useProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import ProductCard from "./ProductCard";
import { GridSkeleton, gridCls } from "./Skeletons";

function Grid({ list }) {
  return (
    <div className={gridCls}>
      {list.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default function HomeProducts() {
  const { data, loading, error } = useProducts();

  const { risers, fallers } = useMemo(() => {
    const list = data || [];
    return {
      risers: list
        .filter((p) => p.change.dir === "up")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6),
      fallers: list
        .filter((p) => p.change.dir === "down")
        .sort((a, b) => a.change.pct - b.change.pct)
        .slice(0, 6),
    };
  }, [data]);

  if (error) {
    return <p className="py-16 text-center text-error">ডেটা লোড করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।</p>;
  }

  return (
    <>
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
        <span className="text-base text-error">▲</span>
        <h2 className="text-xl font-bold leading-7">আজ দাম বেড়েছে</h2>
        </div>
        {loading ? <GridSkeleton count={6} /> : <Grid list={risers} />}
      </section>

  <section className="flex flex-col gap-3">
  <div className="flex items-center gap-2">
  <span className="text-base text-success">▼</span>
  <h2 className="text-xl font-bold leading-7">আজ দাম কমেছে</h2>
  </div>
    {loading ? <GridSkeleton count={6} /> : <Grid list={fallers} />}
  </section>

  <section id="সব-পণ্য" className="flex scroll-mt-40 flex-col gap-3">
  <h2 className="text-xl font-bold leading-7">সব পণ্য</h2>
  <div className="flex flex-col gap-4">
  <p className="text-sm">{loading ? "লোড হচ্ছে…" : `মোট ${toBn(data.length)}টি পণ্য দেখানো হচ্ছে`}</p>
    {loading ? <GridSkeleton count={9} /> : <Grid list={data} />}
  </div>
  </section>
    </>
  );
}