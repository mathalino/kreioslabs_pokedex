<script>
import { onMount } from 'svelte';

  import Card from "./Card.svelte";
  let pokemonUrls = [];
  let nextUrl = '';
  onMount(async () => {
    fetchPokemon('https://pokeapi.co/api/v2/pokemon');
  });

  async function fetchPokemon(url) {
    const response = await fetch(url);
    const data = await response.json();
    pokemonUrls = [...pokemonUrls, ...data.results.map(item => item.url)];
    nextUrl = data.next;
  }

  function loadMore() {
    if (nextUrl) {
      fetchPokemon(nextUrl);
    }
  }
</script>

<svelte:head>
  <title>Pokédex | Home</title>
  <meta name="description" content="Pokédex Demo App" />
</svelte:head>

<section class="container">
  {#each pokemonUrls as url}
    <Card {url} />
  {/each}
</section>
<button class="bg-cyan-400" on:click={loadMore}>Load More Pokémon</button>


