"use client";

// error.tsx MUST be a Client Component — React Error Boundaries require it.

import { useEffect } from "react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function Error({ error, unstable_retry }: ErrorPageProps) {
  useEffect(() => {
    console.error("[Pokémon detail error]", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 px-4 text-center dark:bg-gray-900">
      <span className="text-8xl" aria-hidden="true">
        😵
      </span>
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-gray-800 dark:text-gray-100">
          Couldn&apos;t load this Pokémon
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          The API may be unavailable. Try refreshing.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={unstable_retry}
          className="rounded-full bg-red-500 px-6 py-2.5 font-semibold text-white shadow transition hover:bg-red-600 active:scale-95"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-gray-200 bg-white px-6 py-2.5 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
        >
          ← Back to Pokédex
        </Link>
      </div>
    </main>
  );
}
