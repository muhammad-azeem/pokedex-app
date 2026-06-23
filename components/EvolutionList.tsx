import Link from "next/link";
import Image from "next/image";
import { TypeBadge } from "./TypeBadge";
import { getPrimaryGradient } from "@/lib/typeColors";
import type { PokemonEvolution } from "@/lib/types";

interface EvolutionListProps {
  evolutions: PokemonEvolution[];
  currentName: string;
}

export function EvolutionList({ evolutions, currentName }: EvolutionListProps) {
  if (evolutions.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        This Pokémon does not evolve.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {evolutions.map((evo) => {
        const gradient = getPrimaryGradient(evo.types);
        const isCurrent =
          evo.name.toLowerCase() === currentName.toLowerCase();

        return (
          <Link
            key={evo.id}
            href={`/pokemon/${evo.name.toLowerCase()}`}
            className={`group flex flex-col items-center gap-2 rounded-2xl p-3 transition-all ${
              isCurrent
                ? "ring-2 ring-red-400 cursor-default"
                : "hover:-translate-y-1 hover:shadow-lg"
            } bg-white dark:bg-gray-800 shadow-sm w-28`}
            aria-current={isCurrent ? "page" : undefined}
            tabIndex={isCurrent ? -1 : undefined}
          >
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${gradient}`}
            >
              <Image
                src={evo.image}
                alt={evo.name}
                width={56}
                height={56}
                className="h-14 w-14 object-contain drop-shadow"
              />
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              #{evo.number}
            </span>
            <span className="text-center text-xs font-semibold capitalize text-gray-800 dark:text-gray-200">
              {evo.name}
            </span>
            <div className="flex flex-wrap justify-center gap-1">
              {evo.types.map((t) => (
                <TypeBadge key={t} type={t} size="sm" />
              ))}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
