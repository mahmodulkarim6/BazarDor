export function CardSkeleton() {
  return (
  <div className="flex h-[138px] flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-4">
<div className="flex items-center gap-3">
<div className="skeleton size-12 rounded-xl" />
<div className="flex flex-col gap-2">
  <div className="skeleton h-4 w-24" />
  <div className="skeleton h-3 w-16" />
</div>
</div>
  <div className="flex items-end justify-between">
    <div className="flex flex-col gap-2">
    <div className="skeleton h-3 w-14" />
    <div className="skeleton h-5 w-20" />
  </div>
    <div className="skeleton h-6 w-16 rounded-xl" />
  </div>
</div>
  );
}

export const gridCls = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";
export function GridSkeleton({ count = 6 }) {
  return (
    <div className={gridCls}>
    {Array.from({ length: count }).map((_, i) => (
    <CardSkeleton key={i} />
  ))}
  </div>
  );
}