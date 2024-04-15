<script>
  import { onMount } from "svelte";

  export let pokemon;
  let pokemonData;
  let error = null;
  let isLoading = false;

  const fetchPokemonData = async () => {
    isLoading = true;
    try {
      const response = await fetch(pokemon.url);
      if (response.status === 404) {
        throw new Error("No Pokémon Matched Your Search!");
      }
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon data");
      }
      const data = await response.json();
      pokemonData = data;
    } catch (err) {
      error = err.message;
    } finally {
      isLoading = false;
    }
  };

  onMount(fetchPokemonData);

  $: {
    error = null;
    fetchPokemonData();
    console.log(pokemon);
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function formatPokemonId(id) {
    let idString = id.toString();
    if (idString.length <= 3) {
      let zerosNeeded = 3 - idString.length;
      return "0".repeat(zerosNeeded) + idString;
    } else {
      return idString;
    }
  }
</script>

<div class="card">
  {#if error}
    <p class="!text-red-700">{error}</p>
  {:else if isLoading}
    <p>Loading...</p>
  {:else if pokemonData}
    <img
      src={pokemonData.sprites.front_default}
      alt="{pokemonData.species.name} photo"
    />
    <p>#{formatPokemonId(pokemonData.id)}</p>
    <h2>{capitalizeFirstLetter(pokemonData.species.name)}</h2>
  {/if}
</div>

<style>
  .card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin: 16px;
  }
</style>
