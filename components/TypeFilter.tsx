"use client";

// TypeFilter must be a Client Component because it uses:
//   • onClick event handlers on the filter chips

import { ALL_TYPES } from "@/lib/typeColors";
import { getTypeColors } from "@/lib/typeColors";

interface TypeFilterProps {
  selected: string | null;
  onSelect: (type: string | null) => void;
}

export function TypeFilter({ selected, onSelect }: TypeFilterProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter by Pokémon type"
    >
      {/* All button */}
      <button
        id="type-filter-all"
        onClick={() => onSelect(null)}
        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-all ${
          selected === null
            ? "bg-gray-800 text-white shadow dark:bg-white dark:text-gray-900"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        }`}
        aria-pressed={selected === null}
      >
        All
      </button>

      {ALL_TYPES.map((type) => {
        const colors = getTypeColors(type);
        const isActive = selected === type;
        return (
          <button
            key={type}
            id={`type-filter-${type.toLowerCase()}`}
            onClick={() => onSelect(isActive ? null : type)}
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-all ${
              isActive
                ? `${colors.bg} ${colors.text} shadow-md`
                : `${colors.light} text-gray-700 hover:opacity-80 dark:bg-gray-700 dark:text-gray-200`
            }`}
            aria-pressed={isActive}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
}
