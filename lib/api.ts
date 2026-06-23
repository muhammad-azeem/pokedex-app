/**
 * Lightweight typed GraphQL fetch helper.
 *
 * Why plain fetch instead of graphql-request v7?
 *   graphql-request v7 introduced breaking changes to its request format that
 *   cause 405 errors against some endpoints. A plain fetch gives us full
 *   control over the POST body and headers with zero runtime overhead.
 *
 * Data-fetching strategy:
 *   Both helpers run on the server (async Server Components).
 *   Next.js deduplicates identical fetch calls within the same request, so
 *   calling fetchPokemons() and fetchPokemon() from separate components in
 *   the same render does not fire duplicate network requests.
 */

import { POKEMONS_QUERY, POKEMON_DETAIL_QUERY } from "./queries";
import type {
  PokemonsQueryResponse,
  PokemonQueryResponse,
  PokemonListItem,
  PokemonDetail,
} from "./types";

const GRAPHQL_ENDPOINT = "https://graphql-pokemon2.vercel.app/";

/**
 * Internal typed GraphQL POST helper.
 * Throws with a descriptive message on HTTP errors or GraphQL errors.
 */
async function gqlFetch<T>(
  query: string,
  variables: Record<string, unknown>
): Promise<T> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    // Next.js cache: default (no-store at request time) — data is fetched
    // fresh on every request. For build-time ISR, switch to { next: { revalidate: 3600 } }.
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `GraphQL request failed: ${res.status} ${res.statusText} — ${GRAPHQL_ENDPOINT}`
    );
  }

  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }

  if (!json.data) {
    throw new Error("GraphQL response contained no data.");
  }

  return json.data;
}

/**
 * Fetches the first `count` Pokémon from the API.
 */
export async function fetchPokemons(count: number): Promise<PokemonListItem[]> {
  const data = await gqlFetch<PokemonsQueryResponse>(POKEMONS_QUERY, {
    first: count,
  });
  return data.pokemons;
}

/**
 * Fetches full detail for a single Pokémon by name.
 * Returns null when the API returns null (unknown name).
 */
export async function fetchPokemon(
  name: string
): Promise<PokemonDetail | null> {
  const data = await gqlFetch<PokemonQueryResponse>(POKEMON_DETAIL_QUERY, {
    name,
  });
  return data.pokemon;
}
