/**
 * List page — Server Component (no "use client").
 *
 * Data-fetching strategy:
 *   The 151 Gen-1 Pokémon are static data — they never change. We fetch them
 *   on the server at *request time* (not build time via generateStaticParams)
 *   so that:
 *   1. The page.tsx stays a pure async Server Component.
 *   2. The complete list is available before the HTML is sent, enabling the
 *      client component (PokedexClient) to do instant client-side filtering
 *      without extra round-trips.
 *   3. Next.js request-level deduplication ensures the fetch is made only
 *      once per request even if multiple components call fetchPokemons().
 *
 * All interactivity (search, type filter, pagination) lives in PokedexClient,
 * which is the smallest possible "use client" boundary.
 */

import type { Metadata } from "next";
import { fetchPokemons } from "@/lib/api";
import { PokedexClient } from "@/components/PokedexClient";

export const metadata: Metadata = {
  title: "Pokédex — All 151 Original Pokémon",
  description:
    "Browse, search, and filter all 151 original Pokémon. Click any card to see full details, stats, attacks, and evolutions.",
};

export default async function HomePage() {
  // Fetch all 151 on the server — static Gen-1 data, never changes.
  const pokemons = await fetchPokemons(151);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* ── Hero banner ──────────────────────────────────────────────── */}
      <header className="bg-gradient-to-r from-red-700 via-red-500 to-rose-400 px-4 py-10 shadow-lg sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4">
            {/* Pokéball icon */}
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-white shadow-lg">
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="h-1/2 bg-red-600" />
                <div className="h-1/2 bg-white" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-gray-300 bg-white shadow" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Pokédex
              </h1>
              <p className="mt-1 text-sm text-red-100 sm:text-base">
                {pokemons.length} original Pokémon — search, filter, explore
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ── Interactive section (Client Component boundary) ──────────── */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PokedexClient pokemons={pokemons} pageSize={20} />
      </section>
    </main>
  );
}