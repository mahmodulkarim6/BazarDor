"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { btnOutlineError, btnPrimary, cardCls, inputCls } from "@/lib/ui";
import Avatar from "@/components/Avatar";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !user) {
      toast.error("প্রোফাইল দেখতে আগে সাইন ইন করুন", { id: "auth-required" });
      router.replace("/signin");
    }
    if (user) setName(user.name || "");
  }, [isPending, user, router]);

  const signOut = async () => {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম খালি রাখা যাবে না");

    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    if (error) {
      setLoading(false);
      return toast.error(error.message || "তথ্য আপডেট করা যায়নি");
    }
  
    await authClient.getSession({ query: { disableCookieCache: true } });
    setLoading(false);
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
  };

  if (isPending || !user) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 pt-10">
      <div className="skeleton h-12 w-56" />
      <div className="skeleton h-32 w-full rounded-2xl" />
      <div className="skeleton h-60 w-full rounded-2xl" />
    </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 pt-10">
    <div>
    <h1 className="text-2xl font-bold leading-8">আমার প্রোফাইল</h1>
    <p className="text-sm">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
</div>

<div className={`${cardCls} flex flex-col gap-4 p-6 sm:flex-row sm:items-center`}>
  <Avatar user={user} size={80} radius="rounded-2xl" text="text-3xl" />
  <div className="min-w-0 flex-1">
  <p className="truncate text-xl font-semibold leading-7">{user.name}</p>
  <p className="truncate text-base">{user.email}</p>
</div>
<button onClick={signOut} className={btnOutlineError}>
  ↩ সাইন আউট</button></div>

  <div className={`${cardCls} flex flex-col gap-3 p-5`}>
  <h2 className="text-lg font-semibold leading-7">তথ্য</h2>
  <form onSubmit={onUpdate} className="flex flex-col gap-4 p-1">
  <div className="flex flex-col gap-1">
  <label htmlFor="name" className="text-sm font-medium">নাম</label>
  
  <input id="name" value={name} onChange={(e) => setName(e.target.value)}
    placeholder="আপনার নাম" className={inputCls}/></div>
  
  <button disabled={loading} className={`${btnPrimary} w-full`}>
    {loading ? <span className="loading loading-spinner loading-sm"/> : "আপডেট"}
  </button>
  </form>
  </div>
  </div>
  );
}