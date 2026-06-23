// ── Pokemon type system ───────────────────────────────────────────────────────

export type PokemonType =
  | "Grass"
  | "Poison"
  | "Fire"
  | "Flying"
  | "Water"
  | "Bug"
  | "Normal"
  | "Electric"
  | "Ground"
  | "Fairy"
  | "Fighting"
  | "Psychic"
  | "Rock"
  | "Steel"
  | "Ice"
  | "Ghost"
  | "Dragon"
  | "Dark";

// ── Attack ────────────────────────────────────────────────────────────────────

export interface PokemonAttack {
  name: string;
  type: string;
  damage: number;
}

export interface PokemonAttacks {
  fast: PokemonAttack[];
  special: PokemonAttack[];
}

// ── Evolution ─────────────────────────────────────────────────────────────────

export interface PokemonEvolution {
  id: string;
  name: string;
  image: string;
  types: string[];
  number: string;
}

// ── Dimension ─────────────────────────────────────────────────────────────────

export interface PokemonDimension {
  minimum: string;
  maximum: string;
}

// ── List item (used on the grid page) ─────────────────────────────────────────

export interface PokemonListItem {
  id: string;
  name: string;
  number: string;
  image: string;
  types: string[];
}

// ── Full detail (used on the detail page) ─────────────────────────────────────

export interface PokemonDetail {
  id: string;
  number: string;
  name: string;
  image: string;
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  maxCP: number;
  maxHP: number;
  height: PokemonDimension;
  weight: PokemonDimension;
  attacks: PokemonAttacks;
  evolutions: PokemonEvolution[] | null;
}

// ── API response shapes ────────────────────────────────────────────────────────

export interface PokemonsQueryResponse {
  pokemons: PokemonListItem[];
}

export interface PokemonQueryResponse {
  pokemon: PokemonDetail | null;
}
