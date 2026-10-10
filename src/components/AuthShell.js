import Link from "next/link";
import { cardCls, linkPrimary } from "@/lib/ui";

export default function AuthShell({ title, subtitle, children }) {
  return (
  <div className="mx-auto flex w-full max-w-[448px] flex-col gap-6 px-4 pt-10">
    <div className="flex flex-col gap-1">
    <h1 className="text-2xl font-bold leading-8">{title}</h1>
    <p className="text-sm">{subtitle}</p></div>
  <div className={`${cardCls} p-6`}>{children}</div>
  <Link href="/" className={`self-center text-center text-sm ${linkPrimary}`}>
  ← হোম পেজে ফিরে যান</Link>
  </div>
  );
}

export function Divider() {
  return (
  <div className="flex items-center gap-4 text-xs">
  <span className="h-px flex-1 bg-base-300" />
    অথবা
  <span className="h-px flex-1 bg-base-300" />
    </div>
  );
}