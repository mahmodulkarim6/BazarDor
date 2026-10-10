"use client";
import Image from "next/image";
import { useToday } from "@/lib/useToday";
import { btnPrimary } from "@/lib/ui";

export default function Hero() {
  const today = useToday();
  return (
    <section className="overflow-hidden rounded-3xl border border-base-300 bg-base-100">
      <div className="grid items-center gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:py-4 md:pl-8 md:pr-12">
    <div className="flex flex-col items-start gap-2 py-4">
    <span className="inline-flex h-7 items-center rounded-full bg-primary/12 px-4 text-sm font-bold text-primary">{today || "\u00A0"}</span>
  <h1 className="text-3xl font-bold leading-tight sm:text-4xl sm:leading-[45px]">আজকের বাজারের দাম এক নজরে</h1>
  <p className="max-w-xl pt-1 text-base">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>

  <a href="#সব-পণ্য" className={`${btnPrimary} mt-3`}>সব পণ্য দেখুন</a>
  </div>
  <div className="flex justify-center">
    <Image src="/bazar-hero.png" alt="বাজারের ঝুড়ি ভর্তি সবজি ও ফল" width={315}height={263} priority className="h-auto w-56 sm:w-72 md:w-[315px]"/>
  </div>
</div>
</section>
  );
}
