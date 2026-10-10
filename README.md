# 🛒 বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্য — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলা — এর আজকের দাম, দাম বাড়া-কমার হার এবং বিভিন্ন বাজারের তুলনা এক জায়গায় দেখার একটি রেস্পন্সিভ ওয়েব অ্যাপ।

**Live Link: https://bazar-dor-gamma-seven.vercel.app/ **

## ✨ Key Features

1. **Figma-অনুযায়ী ডিজাইন** – Header, ক্যাটাগরি চিপ, লাইভ প্রাইস টিকার (infinite marquee), Hero, কার্ড ও ফুটার; দাম বাড়লে 🔴 লাল, কমলে 🟢 সবুজ
2. **আজ দাম বাড়া/কমা** – সবচেয়ে বেশি দাম বাড়া ও কমা ৬টি করে পণ্য আলাদা সেকশনে
3. **ক্যাটাগরি পেজ + সর্টিং** – দাম অনুযায়ী (কম→বেশি / বেশি→কম) সর্ট, বাংলা সংখ্যা নয়, আসল সংখ্যার ওপর ভিত্তি করে
4. **পণ্যের বিস্তারিত (Protected)** – সর্বনিম্ন/সর্বোচ্চ/গড় দাম এবং বিভাগ ও বাজারভিত্তিক দামের তালিকা
5. **Authentication** – BetterAuth দিয়ে Email/Password + Google + GitHub লগইন, toast নোটিফিকেশন, প্রোফাইল ও নাম আপডেট
6. Skeleton loading, কাস্টম ৪০৪ পেজ, সম্পূর্ণ responsive (mobile / tablet / desktop)

## 🧰 Technologies Used

- Next.js (App Router) + JavaScript
- Tailwind CSS v4 + DaisyUI (custom theme, Hind Siliguri font)
- BetterAuth + MongoDB
- react-hot-toast

## 🚀 Run Locally

```bash
npm install
npm run dev

## 🔐 Environment Variables

প্রজেক্টের রুটে `.env.local` ফাইল বানিয়ে নিচের key গুলো দিন:

MONGODB_URI, BETTER_AUTH_SECRET, BETTER_AUTH_URL, NEXT_PUBLIC_BETTER_AUTH_URL,
GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET

Google/GitHub OAuth-এর callback URL: `{BETTER_AUTH_URL}/api/auth/callback/google` ও `/github`
