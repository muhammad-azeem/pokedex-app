/**
 * Single attack card — purely presentational.
 */

import { TypeBadge } from "./TypeBadge";
import type { PokemonAttack } from "@/lib/types";

interface AttackCardProps {
  attack: PokemonAttack;
}

export function AttackCard({ attack }: AttackCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-700/50">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          {attack.name}
        </span>
        <TypeBadge type={attack.type} size="sm" />
      </div>
      <div className="flex flex-col items-end">
        <span className="text-xs text-gray-500 dark:text-gray-400">DMG</span>
        <span className="text-lg font-black text-gray-800 dark:text-gray-100">
          {attack.damage}
        </span>
      </div>
    </div>
  );
}
