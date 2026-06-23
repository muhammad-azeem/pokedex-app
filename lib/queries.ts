// GraphQL query strings. Variables are used so graphql-request can safely
// substitute them — no string interpolation / injection risk.

export const POKEMONS_QUERY = /* GraphQL */ `
  query Pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      image
      types
    }
  }
`;

export const POKEMON_DETAIL_QUERY = /* GraphQL */ `
  query Pokemon($name: String) {
    pokemon(name: $name) {
      id
      number
      name
      image
      classification
      types
      resistant
      weaknesses
      maxCP
      maxHP
      height {
        minimum
        maximum
      }
      weight {
        minimum
        maximum
      }
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        number
        name
        image
        types
      }
    }
  }
`;
