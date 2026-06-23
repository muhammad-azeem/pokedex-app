"use client";

// FavoritesButton must be a Client Component because it uses:
//   • useState (isFavorite toggle)
//   • useEffect (localStorage read on mount)
//   • localStorage (browser API)

import { useState, useEffect } from "react";

interface FavoritesButtonProps {
  pokemonId: string;
  pokemonName: string;
}

const STORAGE_KEY = "pokedex-favorites";

function getFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set<string>(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function saveFavorites(favorites: Set<string>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
}

export function FavoritesButton({
  pokemonId,
  pokemonName,
}: FavoritesButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Read localStorage after hydration to avoid SSR mismatch
  useEffect(() => {
    setIsFavorite(getFavorites().has(pokemonId));
    setMounted(true);
  }, [pokemonId]);

  const toggle = () => {
    const favorites = getFavorites();
    if (favorites.has(pokemonId)) {
      favorites.delete(pokemonId);
    } else {
      favorites.add(pokemonId);
    }
    saveFavorites(favorites);
    setIsFavorite(favorites.has(pokemonId));
  };

  // Render a neutral placeholder on the server to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        className="rounded-full border border-gray-200 bg-white/80 p-2.5 opacity-0"
        aria-label="Toggle favorite"
        disabled
      >
        ♡
      </button>
    );
  }

  return (
    <button
      id={`favorite-${pokemonId}`}
      onClick={toggle}
      className={`rounded-full border bg-white/90 p-2.5 text-xl shadow transition-all hover:scale-110 active:scale-95 dark:bg-gray-800/90 ${
        isFavorite
          ? "border-red-400 text-red-500"
          : "border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400 dark:border-gray-600"
      }`}
      aria-label={
        isFavorite
          ? `Remove ${pokemonName} from favorites`
          : `Add ${pokemonName} to favorites`
      }
      aria-pressed={isFavorite}
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
}
