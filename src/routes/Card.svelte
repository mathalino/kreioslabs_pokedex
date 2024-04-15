<script>
  import { onMount } from "svelte";

  import {capitalizeFirstLetter, formatPokemonId} from '../lib/js/reusables';

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
