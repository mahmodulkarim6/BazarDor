"use client";
import { useMemo, useState } from "react";
import { useCategories, useProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import { cardCls } from "@/lib/ui";
import ProductCard from "./ProductCard";
import { GridSkeleton, gridCls } from "./Skeletons";
import NotFoundView from "./NotFoundView";

export default function CategoryView({ slug }) {
  const cats = useCategories();
  const prods = useProducts();
  const [sort, setSort] = useState("default");

  const category = cats.data?.find((c) => c.slug === slug);

  const list = useMemo(() => {
    const items = (prods.data || []).filter((p) => p.category === slug);
    if (sort === "asc") items.sort((a, b) => a.today - b.today);
    if (sort === "desc") items.sort((a, b) => b.today - a.today);
    return items;
  }, [prods.data, slug, sort]);

const loading = cats.loading || prods.loading;

  if (!loading && (!category || list.length === 0)) {
    return <NotFoundView message="এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি বা ক্যাটাগরিটি বৈধ নয়।" />;
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pt-6">
      <div className={`${cardCls} p-5`}>
      {loading ? (
    <div className="flex items-center gap-3">
    <div className="skeleton size-10" />
    <div className="flex flex-col gap-2">
    <div className="skeleton h-6 w-32" />
    <div className="skeleton h-4 w-48" /></div>
</div>
) : (
  <div className="flex items-center gap-3">
  <span className="text-4xl leading-10">{category.icon}</span>
  <div>
  <h1 className="text-2xl font-bold leading-8">{category.nameBn}</h1>
  <p className="text-sm">{toBn(list.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
  </div>
  </div>
)}
</div>

  <div className="flex flex-col gap-4">
    <div className={`${cardCls} flex items-center justify-end gap-2 px-4 py-4`}>
    <label htmlFor="sort" className="text-sm">
      সাজান</label>

  <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="h-8 cursor-pointer rounded-lg border border-base-content bg-base-100 px-2.5 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/30">
  <option value="default">ডিফল্ট</option>
  <option value="asc">দাম: কম থেকে বেশি</option>
  <option value="desc">দাম: বেশি থেকে কম</option></select>
  </div>

  <p className="text-sm">{loading ? "লোড হচ্ছে…" : `মোট ${toBn(list.length)}টি পণ্য দেখানো হচ্ছে`}</p>

  {loading ? (
  <GridSkeleton count={6} />
) : (
  <div className={gridCls}>
  {list.map((p) => (
  <ProductCard key={p.id} product={p} />
  ))}
</div>
)}
</div>
</div>
  );
}