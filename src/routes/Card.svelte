<script>
    import { onMount } from "svelte";
  
    export let pokemon;
    let pokemonData;
    let error = null;
  
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(pokemon.url);
        if (response.status === 404) {
          throw new Error("Pokemon not found");
        }
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon data");
        }
        const data = await response.json();
        pokemonData = data;
      } catch (err) {
        error = err.message;
      }
    };
  
    onMount(fetchPokemonData);
  
    $: {
        error = null
      fetchPokemonData();
      // Added console.log so that reactive is functional.
      // No solution yet why this is happening.
      console.log(pokemon);
    }
  
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function formatPokemonId(id) {
    let idString = id.toString();
    let zerosNeeded = 3 - idString.length;
    return '0'.repeat(zerosNeeded) + idString;
  }
  </script>
  
  <div class="card">
    {#if error}
      <p>{error}</p>
    {:else if pokemonData}
      <img
        src={pokemonData.sprites.front_default}
        alt="{pokemonData.species.name} photo"
      />
      <p>#{formatPokemonId(pokemonData.id)}</p>
      <h2>{capitalizeFirstLetter(pokemonData.species.name)}</h2>

    {:else}
      <p>Loading...</p>
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
  