<script>
  import { onMount } from "svelte";

  export let url;
  let pokemonData;

  onMount(async () => {
    const response = await fetch(url);
    const data = await response.json();
    pokemonData = data;
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
</script>

<div class="card">
  {#if pokemonData}
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
