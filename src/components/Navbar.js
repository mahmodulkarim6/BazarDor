"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useCategories } from "@/lib/api";
import { useToday } from "@/lib/useToday";
import { btnGhost, btnPrimary } from "@/lib/ui";
import Avatar from "./Avatar";
import Ticker from "./Ticker";

function UserMenu({ user }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const signOut = async () => {
    setOpen(false);
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`${btnGhost} !h-8 gap-2 !px-1 sm:!h-10 sm:!px-1.5`}>
        <Avatar user={user} size={32} radius="rounded-[10px]" />
        <span className="hidden max-w-[120px] truncate text-sm font-medium sm:inline">{user.name}</span>
        <span className="text-xs">▾</span></button>

{open && (
  <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-base-300 bg-base-100 p-[9px] shadow-lg">
    <div className="px-3 py-2">
    <p className="truncate text-sm font-semibold">{user.name}</p>
        <p className="truncate text-xs">{user.email}</p>
</div>
  <Link href="/profile" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm hover:bg-base-content/10">
    👤 আমার প্রোফাইল</Link>

<button onClick={signOut} className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-error hover:bg-base-content/10">
    ↩ সাইন আউট</button>
    </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { data: categories } = useCategories();
  const { data: session, isPending } = authClient.useSession();
  const today = useToday();
  const user = session?.user;

  const chip = (active) =>
    `inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border px-3.5 text-xs font-semibold transition ${
      active
        ? "border-primary-stronger bg-primary-strong text-primary-content"
        : "border-transparent hover:border-hover-neutral-border hover:bg-hover-neutral"
    }`;

  return (
    <header className="sticky top-0 z-40">
      <div className="border-b border-base-300 bg-base-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
      <Link href="/" className="flex min-w-0 items-center gap-2">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-lg text-primary-content">
        🛒</span>
    <span className="flex min-w-0 flex-col">
    <span className="text-xl font-bold leading-7">বাজার দর</span>
    <span className="text-xs leading-4">{today || "\u00A0"}</span>
  </span>
  </Link>

    <div className="flex shrink-0 items-center gap-2">
    {isPending ? (
  <div className="skeleton h-10 w-32 rounded-lg" />
    ) : user ? (
    <UserMenu user={user} />
  ) : (<>
<Link href="/signin" className={`${btnGhost} !h-8 !px-3 !text-xs sm:!h-10 sm:!px-4 sm:!text-sm`}>সাইন ইন</Link>

  <Link href="/signup" className={`${btnPrimary} !h-8 !px-3 !text-xs sm:!h-10 sm:!px-4 sm:!text-sm`}>সাইন আপ</Link></>)}
  </div>
  </div>
</div>

    <nav className="border-b border-base-200 bg-base-100">
      <div className="mx-auto max-w-6xl px-4">
      <div className="hide-scrollbar flex h-12 items-center gap-1 overflow-x-auto">
        {categories ? categories.map((c) => (
    <Link key={c.id} href={`/category/${c.slug}`} className={chip(pathname === `/category/${c.slug}`)}>
    <span>{c.icon}</span>
    <span>{c.nameBn}</span></Link>
))
: Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton h-8 w-[72px] shrink-0 rounded-lg" />)}
</div>
  </div>
</nav>
<Ticker />
</header>
  );
}