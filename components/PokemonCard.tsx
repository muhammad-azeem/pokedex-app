import Link from "next/link";
import Image from "next/image";
import { TypeBadge } from "./TypeBadge";
import { getPrimaryGradient } from "@/lib/typeColors";
import type { PokemonListItem } from "@/lib/types";

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const gradient = getPrimaryGradient(pokemon.types);

  return (
    <Link
      href={`/pokemon/${pokemon.name.toLowerCase()}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
      aria-label={`View details for ${pokemon.name}`}
    >
      {/* Gradient header */}
      <div
        className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${gradient} sm:h-40`}
      >
        {/* Decorative Pokéball watermark */}
        <span
          aria-hidden="true"
          className="absolute right-2 top-2 text-6xl font-black text-white/10 select-none"
        >
          ◕
        </span>

        {/* Number badge */}
        <span className="absolute left-3 top-3 rounded-full bg-black/20 px-2 py-0.5 text-xs font-bold text-white backdrop-blur-sm">
          #{pokemon.number}
        </span>

        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={100}
          height={100}
          className="z-10 h-24 w-24 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-28 sm:w-28"
          priority={parseInt(pokemon.number) <= 20}
        />
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h2 className="text-center text-sm font-bold capitalize text-gray-800 dark:text-gray-100 sm:text-base">
          {pokemon.name}
        </h2>
        <div className="flex flex-wrap justify-center gap-1">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} size="sm" />
          ))}
        </div>
      </div>
    </Link>
  );
}
