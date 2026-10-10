"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { btnPrimary, linkPrimary } from "@/lib/ui";
import AuthShell, { Divider } from "@/components/AuthShell";
import FormField from "@/components/FormField";
import SocialButtons from "@/components/SocialButtons";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fail = (msg) => {
    setError(msg);
    toast.error(msg);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const name = form.get("name")?.toString().trim();
    const email = form.get("email")?.toString().trim();
    const password = form.get("password")?.toString();
    const confirm = form.get("confirm")?.toString();

    if (!name || !email || !password || !confirm) return fail("সব ঘর পূরণ করুন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return fail("পাসওয়ার্ড দুটি মিলছে না");

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);
    if (error) return fail(error.message || "রেজিস্ট্রেশন করা যায়নি");

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এবার সাইন ইন করুন");
    router.push("/signin");
  };

  return (
    <AuthShell title="অ্যাকাউন্ট তৈরি করুন" subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।">
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <FormField id="name" label="নাম" type="text" placeholder="যেমন: রহিম মিয়া" autoComplete="name" />
      <FormField id="email" label="ইমেইল" type="email" placeholder="you@example.com" autoComplete="email" />
      <FormField id="password" label="পাসওয়ার্ড" type="password" placeholder="কমপক্ষে ৮ অক্ষর" autoComplete="new-password" />
      <FormField id="confirm" label="পাসওয়ার্ড নিশ্চিত করুন" type="password" placeholder="আবার লিখুন" autoComplete="new-password" />
      {error && <p className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">{error}</p>}
      <button disabled={loading} className={`${btnPrimary} w-full`}>
      {loading ? <span className="loading loading-spinner loading-sm" /> : "অ্যাকাউন্ট তৈরি করুন"}</button>
  <Divider />
  <SocialButtons />
  <p className="text-sm">
    অ্যাকাউন্ট আছে?{" "}
  <Link href="/signin" className={linkPrimary}>
    সাইন ইন করুন</Link></p>
  </form>
</AuthShell>
  );
}