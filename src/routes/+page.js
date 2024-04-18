export const prerender = true;

export async function load({ fetch }) {
  let pokemonUrls = [];
  let allPokemons = [];
  let filteredPokemons = [];

  // Fetch Pokémon data
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0");
  const data = await response.json();
  pokemonUrls = data.results;

  // Fetch detailed Pokémon information
  allPokemons = await fetchPokemons(fetch, pokemonUrls);

  // Set filteredPokemons based on initial data
  filteredPokemons = allPokemons.slice(0, perPage);

  return {
    pokemonUrls,
    allPokemons,
    filteredPokemons,
  };
}

async function fetchPokemons(fetch, urls) {
  const pokemons = await Promise.all(
    urls.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return response.json();
    })
  );
  return pokemons;
}

const perPage = 24;
