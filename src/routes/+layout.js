import { updatePokemons } from "./pokemons";

export const load = async (loadEvent) => {
  const { fetch } = loadEvent;

  const fetchPokemonData = async (urls) => {
    const responses = await Promise.all(
      urls.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        return response.json();
      })
    );
    return responses;
  };

  const fetchData = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=48&offset=0`
    );
    const data = await response.json();
    let pokemonUrls = data.results;

    const pokemonData = await fetchPokemonData(pokemonUrls);
    const pokemonsWithImages = await fetchPokemonImages(pokemonData); // Fetch images for pokemons

    updatePokemons(pokemonsWithImages); // Update pokemons variable with combined data and images
  };

  const fetchPokemonImages = async (pokemonData) => {
    return await Promise.all(
      pokemonData.map(async (data) => {
        const imageResponse = await fetch(
          data.sprites.other.home.front_default
        );
        const imageBlob = await imageResponse.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        data.image = imageUrl;
        return data;
      })
    );
  };

  await fetchData();
};
