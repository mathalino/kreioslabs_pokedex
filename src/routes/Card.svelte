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
      fetchPokemonData(); // Call the function to fetch data
      console.log(pokemon);
    }
  
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
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
      <p>#{pokemonData.id}</p>
      <h2>{capitalizeFirstLetter(pokemonData.species.name)}</h2>
  
      <!-- Render other data as needed -->
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
  