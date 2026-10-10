import Link from "next/link";
import { btnPrimary } from "@/lib/ui";

export default function NotFoundView({ message = "দুঃখিত, আপনি যে পাতাটি খুঁজছেন তা পাওয়া যায়নি।" }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
      <div className="flex size-20 items-center justify-center rounded-2xl bg-base-100 text-5xl border border-base-300">🛒</div>
      <h1 className="mt-5 text-5xl font-bold text-primary">৪০৪</h1>
      <p className="mt-3">{message}</p>
      <Link href="/" className={`${btnPrimary} mt-6`}>
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
