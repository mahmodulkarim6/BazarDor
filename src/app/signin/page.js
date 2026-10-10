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

export default function SignInPage() {
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
    const email = form.get("email")?.toString().trim();
    const password = form.get("password")?.toString();
    if (!email || !password) return fail("ইমেইল ও পাসওয়ার্ড দিন");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (error) return fail(error.message || "ইমেইল অথবা পাসওয়ার্ড ভুল");

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <AuthShell title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।">
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <FormField id="email" label="ইমেইল" type="email" placeholder="you@example.com" autoComplete="email" />
      <FormField id="password" label="পাসওয়ার্ড" type="password" placeholder="আপনার পাসওয়ার্ড" autoComplete="current-password" />
      {error && <p className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">{error}</p>}
  <button disabled={loading} className={`${btnPrimary} w-full`}>
  {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
</button>
<Divider />
<SocialButtons />
  <p className="text-sm">
    অ্যাকাউন্ট নেই?{" "}
<Link href="/signup" className={linkPrimary}>
    সাইন আপ করুন</Link></p></form>
</AuthShell>
  );
}
