"use client";

// PokedexClient is a Client Component because it owns:
//   • search state
//   • active type filter state
//   • current page state
// All three require useState, so only this wrapper needs "use client".
// The grid and cards themselves are rendered inside here; they can be Server
// Components if extracted, but here they're rendered directly from the prop
// data so no server round-trip is needed.

import { useState, useMemo } from "react";
import { PokemonCard } from "./PokemonCard";
import { SearchInput } from "./SearchInput";
import { TypeFilter } from "./TypeFilter";
import type { PokemonListItem } from "@/lib/types";

interface PokedexClientProps {
  /** Full list of 151 Pokémon — fetched once on the server. */
  pokemons: PokemonListItem[];
  pageSize?: number;
}

const DEFAULT_PAGE_SIZE = 20;

export function PokedexClient({
  pokemons,
  pageSize = DEFAULT_PAGE_SIZE,
}: PokedexClientProps) {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // Reset to page 1 whenever filter changes
  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };
  const handleType = (type: string | null) => {
    setActiveType(type);
    setPage(1);
  };

  const filtered = useMemo(() => {
    return pokemons.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase().trim());
      const matchesType = activeType
        ? p.types.includes(activeType)
        : true;
      return matchesSearch && matchesType;
    });
  }, [pokemons, search, activeType]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6">
      {/* ── Controls ──────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800 sm:flex-row sm:items-start">
        <SearchInput value={search} onChange={handleSearch} />
      </div>

      {/* Type filter chips */}
      <TypeFilter selected={activeType} onSelect={handleType} />

      {/* ── Result count ──────────────────────────────────────────────── */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {filtered.length === 0
          ? "No Pokémon found"
          : `Showing ${paginated.length} of ${filtered.length} Pokémon`}
        {activeType && (
          <span className="ml-1 font-medium text-gray-700 dark:text-gray-300">
            · {activeType} type
          </span>
        )}
      </p>

      {/* ── Empty state ───────────────────────────────────────────────── */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-gray-200 py-20 text-center dark:border-gray-700">
          <span className="text-6xl" aria-hidden="true">
            🔍
          </span>
          <div>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              No Pokémon found
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Try a different name or type filter
            </p>
          </div>
          <button
            onClick={() => {
              handleSearch("");
              handleType(null);
            }}
            className="rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white hover:bg-red-600"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* ── Grid ──────────────────────────────────────────────────────── */}
      {paginated.length > 0 && (
        <div
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          role="list"
          aria-label="Pokémon grid"
        >
          {paginated.map((pokemon) => (
            <div key={pokemon.id} role="listitem">
              <PokemonCard pokemon={pokemon} />
            </div>
          ))}
        </div>
      )}

      {/* ── Pagination ────────────────────────────────────────────────── */}
      {totalPages > 1 && filtered.length > 0 && (
        <nav
          className="flex items-center justify-center gap-2 pt-4"
          aria-label="Pagination"
        >
          <button
            id="pagination-prev"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label="Previous page"
          >
            ← Prev
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 ||
                  p === totalPages ||
                  Math.abs(p - currentPage) <= 1
              )
              .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) {
                  acc.push("…");
                }
                acc.push(p);
                return acc;
              }, [])
              .map((item, idx) =>
                item === "…" ? (
                  <span key={`ellipsis-${idx}`} className="px-1 text-gray-400">
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => setPage(item as number)}
                    className={`h-9 w-9 rounded-lg text-sm font-semibold transition ${
                      currentPage === item
                        ? "bg-red-500 text-white shadow"
                        : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                    aria-label={`Page ${item}`}
                    aria-current={currentPage === item ? "page" : undefined}
                  >
                    {item}
                  </button>
                )
              )}
          </div>

          <button
            id="pagination-next"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label="Next page"
          >
            Next →
          </button>
        </nav>
      )}
    </div>
  );
}
