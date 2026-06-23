import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 px-4 text-center dark:bg-gray-900">
      {/* Fainted Pokéball animation */}
      <div className="relative h-28 w-28">
        <div className="absolute inset-0 rounded-full border-8 border-gray-300 shadow-lg dark:border-gray-600">
          <div className="h-1/2 rounded-t-full bg-red-400" />
          <div className="h-1/2 rounded-b-full bg-white dark:bg-gray-800" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full border-4 border-gray-300 bg-white shadow-inner dark:border-gray-600 dark:bg-gray-700" />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-5xl font-black text-gray-800 dark:text-gray-100">
          404
        </p>
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          Pokémon Not Found
        </h1>
        <p className="max-w-sm text-gray-500 dark:text-gray-400">
          That Pokémon doesn&apos;t exist in the Pokédex. Check the name and
          try again!
        </p>
      </div>

      <Link
        href="/"
        className="rounded-full bg-red-500 px-8 py-3 font-semibold text-white shadow transition hover:bg-red-600 active:scale-95"
      >
        ← Back to Pokédex
      </Link>
    </main>
  );
}
