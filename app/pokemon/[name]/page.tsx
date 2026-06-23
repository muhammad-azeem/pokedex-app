/**
 * Pokémon detail page — Server Component (no "use client").
 *
 * Data-fetching strategy:
 *   Fetched at request time (dynamic rendering). We do NOT use
 *   generateStaticParams here because:
 *   1. The Gen-1 Pokémon list is small (151), but pre-building all 151 HTML
 *      files at build time has no real UX benefit for an intern assessment —
 *      the API is fast enough to render in ~100–200 ms.
 *   2. If this were a production app, adding generateStaticParams + ISR would
 *      be the natural next step (documented in README trade-offs).
 *
 * The page calls notFound() BEFORE any Suspense boundary so that invalid
 * Pokémon names produce a real HTTP 404 status, not a client-side 404.
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata, PageProps } from "next";
import { fetchPokemon } from "@/lib/api";
import { TypeBadge } from "@/components/TypeBadge";
import { StatBar } from "@/components/StatBar";
import { AttackCard } from "@/components/AttackCard";
import { EvolutionList } from "@/components/EvolutionList";
import { FavoritesButton } from "@/components/FavoritesButton";
import { getPrimaryGradient } from "@/lib/typeColors";

// ── Metadata (per-page title / description) ────────────────────────────────

export async function generateMetadata(
  props: PageProps<"/pokemon/[name]">
): Promise<Metadata> {
  const { name } = await props.params;
  const decoded = decodeURIComponent(name);
  const pokemon = await fetchPokemon(decoded);

  if (!pokemon) {
    return { title: "Pokémon Not Found" };
  }

  const capitalized =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return {
    title: `${capitalized} (#${pokemon.number})`,
    description: `${capitalized} is a ${pokemon.types.join("/")} type Pokémon. Classification: ${pokemon.classification}. Max CP: ${pokemon.maxCP}, Max HP: ${pokemon.maxHP}.`,
  };
}

// ── Page component ─────────────────────────────────────────────────────────

export default async function PokemonDetailPage(
  props: PageProps<"/pokemon/[name]">
) {
  const { name } = await props.params;
  const decoded = decodeURIComponent(name);
  const pokemon = await fetchPokemon(decoded);

  // notFound() before any Suspense boundary → real HTTP 404
  if (!pokemon) {
    notFound();
  }

  const gradient = getPrimaryGradient(pokemon.types);
  const capitalized =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} pb-10 pt-8`}
      >
        {/* Back nav */}
        <div className="absolute left-4 top-4 z-10 sm:left-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-full bg-black/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-black/30"
          >
            ← Pokédex
          </Link>
        </div>

        {/* Favorites */}
        <div className="absolute right-4 top-4 z-10 sm:right-6">
          <FavoritesButton
            pokemonId={pokemon.id}
            pokemonName={capitalized}
          />
        </div>

        {/* Decorative watermark */}
        <span
          aria-hidden="true"
          className="absolute right-4 bottom-0 text-[10rem] font-black text-white/10 leading-none select-none"
        >
          ◕
        </span>

        {/* Number */}
        <span className="mb-1 rounded-full bg-black/20 px-3 py-1 text-xs font-bold text-white">
          #{pokemon.number}
        </span>

        {/* Sprite */}
        <Image
          src={pokemon.image}
          alt={`Official artwork of ${pokemon.name}`}
          width={180}
          height={180}
          priority
          className="relative z-10 h-40 w-40 object-contain drop-shadow-2xl sm:h-48 sm:w-48"
        />

        {/* Name */}
        <h1 className="mt-3 text-3xl font-black capitalize text-white drop-shadow sm:text-4xl">
          {pokemon.name}
        </h1>

        {/* Types */}
        <div className="mt-2 flex gap-2">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} size="lg" />
          ))}
        </div>

        {/* Classification */}
        <p className="mt-2 text-sm text-white/80">{pokemon.classification}</p>
      </header>

      {/* ── Detail cards ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl space-y-5 px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Stats ── */}
        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-gray-100">
            Base Stats
          </h2>
          <div className="space-y-3">
            <StatBar label="Max CP" value={pokemon.maxCP} maxValue={3000} color="bg-red-500" />
            <StatBar label="Max HP" value={pokemon.maxHP} maxValue={3000} color="bg-green-500" />
          </div>
        </div>

        {/* ── Measurements ── */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800">
            <h2 className="mb-3 text-lg font-bold text-gray-800 dark:text-gray-100">
              Height
            </h2>
            <div className="space-y-2">
              <StatBar label="Min" value={pokemon.height.minimum} />
              <StatBar label="Max" value={pokemon.height.maximum} />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800">
            <h2 className="mb-3 text-lg font-bold text-gray-800 dark:text-gray-100">
              Weight
            </h2>
            <div className="space-y-2">
              <StatBar label="Min" value={pokemon.weight.minimum} />
              <StatBar label="Max" value={pokemon.weight.maximum} />
            </div>
          </div>
        </div>

        {/* ── Weaknesses & Resistances ── */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800">
            <h2 className="mb-3 text-lg font-bold text-gray-800 dark:text-gray-100">
              Weaknesses
            </h2>
            <div className="flex flex-wrap gap-2">
              {pokemon.weaknesses.map((w) => (
                <TypeBadge key={w} type={w} size="md" />
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800">
            <h2 className="mb-3 text-lg font-bold text-gray-800 dark:text-gray-100">
              Resistances
            </h2>
            <div className="flex flex-wrap gap-2">
              {pokemon.resistant.map((r) => (
                <TypeBadge key={r} type={r} size="md" />
              ))}
            </div>
          </div>
        </div>

        {/* ── Attacks ── */}
        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-gray-100">
            Attacks
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Fast attacks */}
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Fast
              </h3>
              <div className="space-y-2">
                {pokemon.attacks.fast.map((attack) => (
                  <AttackCard key={attack.name} attack={attack} />
                ))}
              </div>
            </div>

            {/* Special attacks */}
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Special
              </h3>
              <div className="space-y-2">
                {pokemon.attacks.special.map((attack) => (
                  <AttackCard key={attack.name} attack={attack} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Evolutions ── */}
        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-gray-100">
            Evolutions
          </h2>
          <EvolutionList
            evolutions={pokemon.evolutions ?? []}
            currentName={pokemon.name}
          />
        </div>
      </section>
    </main>
  );
}
