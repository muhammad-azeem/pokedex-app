/**
 * Pokémon type → Tailwind background / text color mapping.
 * Using explicit class strings (not template literals) so Tailwind's scanner
 * can detect them at build time.
 */

export const TYPE_COLORS: Record<
  string,
  { bg: string; text: string; border: string; light: string }
> = {
  Grass:    { bg: "bg-emerald-500",  text: "text-emerald-50",  border: "border-emerald-400",  light: "bg-emerald-50"  },
  Poison:   { bg: "bg-purple-500",   text: "text-purple-50",   border: "border-purple-400",   light: "bg-purple-50"   },
  Fire:     { bg: "bg-orange-500",   text: "text-orange-50",   border: "border-orange-400",   light: "bg-orange-50"   },
  Flying:   { bg: "bg-sky-400",      text: "text-sky-50",      border: "border-sky-300",      light: "bg-sky-50"      },
  Water:    { bg: "bg-blue-500",     text: "text-blue-50",     border: "border-blue-400",     light: "bg-blue-50"     },
  Bug:      { bg: "bg-lime-500",     text: "text-lime-50",     border: "border-lime-400",     light: "bg-lime-50"     },
  Normal:   { bg: "bg-stone-400",    text: "text-stone-50",    border: "border-stone-300",    light: "bg-stone-50"    },
  Electric: { bg: "bg-yellow-400",   text: "text-yellow-900",  border: "border-yellow-300",   light: "bg-yellow-50"   },
  Ground:   { bg: "bg-amber-600",    text: "text-amber-50",    border: "border-amber-500",    light: "bg-amber-50"    },
  Fairy:    { bg: "bg-pink-400",     text: "text-pink-50",     border: "border-pink-300",     light: "bg-pink-50"     },
  Fighting: { bg: "bg-red-600",      text: "text-red-50",      border: "border-red-500",      light: "bg-red-50"      },
  Psychic:  { bg: "bg-fuchsia-500",  text: "text-fuchsia-50",  border: "border-fuchsia-400",  light: "bg-fuchsia-50"  },
  Rock:     { bg: "bg-yellow-700",   text: "text-yellow-50",   border: "border-yellow-600",   light: "bg-yellow-50"   },
  Steel:    { bg: "bg-slate-500",    text: "text-slate-50",    border: "border-slate-400",    light: "bg-slate-50"    },
  Ice:      { bg: "bg-cyan-400",     text: "text-cyan-50",     border: "border-cyan-300",     light: "bg-cyan-50"     },
  Ghost:    { bg: "bg-violet-700",   text: "text-violet-50",   border: "border-violet-600",   light: "bg-violet-50"   },
  Dragon:   { bg: "bg-indigo-600",   text: "text-indigo-50",   border: "border-indigo-500",   light: "bg-indigo-50"   },
  Dark:     { bg: "bg-neutral-800",  text: "text-neutral-50",  border: "border-neutral-700",  light: "bg-neutral-100" },
};

export function getTypeColors(type: string) {
  return TYPE_COLORS[type] ?? {
    bg: "bg-gray-400",
    text: "text-gray-50",
    border: "border-gray-300",
    light: "bg-gray-50",
  };
}

/** Primary type gradient used as the card/detail page accent colour. */
export const TYPE_GRADIENTS: Record<string, string> = {
  Grass:    "from-emerald-400 to-green-600",
  Poison:   "from-purple-400 to-purple-700",
  Fire:     "from-orange-400 to-red-600",
  Flying:   "from-sky-300 to-blue-500",
  Water:    "from-blue-400 to-blue-700",
  Bug:      "from-lime-400 to-green-600",
  Normal:   "from-stone-300 to-stone-500",
  Electric: "from-yellow-300 to-amber-500",
  Ground:   "from-amber-400 to-yellow-700",
  Fairy:    "from-pink-300 to-rose-500",
  Fighting: "from-red-500 to-red-800",
  Psychic:  "from-fuchsia-400 to-pink-600",
  Rock:     "from-yellow-600 to-amber-800",
  Steel:    "from-slate-400 to-slate-700",
  Ice:      "from-cyan-300 to-sky-500",
  Ghost:    "from-violet-500 to-purple-800",
  Dragon:   "from-indigo-500 to-blue-800",
  Dark:     "from-neutral-700 to-neutral-900",
};

export function getPrimaryGradient(types: string[]): string {
  const primary = types[0] ?? "Normal";
  return TYPE_GRADIENTS[primary] ?? "from-gray-400 to-gray-600";
}

/** All 18 Pokémon types for the filter UI. */
export const ALL_TYPES = Object.keys(TYPE_COLORS) as string[];
