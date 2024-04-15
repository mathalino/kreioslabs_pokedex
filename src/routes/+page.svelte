<script>
  import { onMount } from "svelte";
  import Card from "./Card.svelte";
  import Header from "./Header.svelte";

  let pokemonData = [];
  let morePokemons = "";

  // Fetch Pokémon data when the component is mounted
  onMount(async () => {
    fetchPokemons("https://pokeapi.co/api/v2/pokemon");
  });

  // Function to fetch Pokémon data
  async function fetchPokemons(url) {
    const response = await fetch(url);
    const data = await response.json();
    pokemonData = [...pokemonData, ...data.results];
    morePokemons = data.next;
  }


  // Function to load more Pokémon
  function loadMore() {
    if (morePokemons) {
      fetchPokemons(morePokemons);
    }
  }

  // Function to handle search event from Header component
  async function handleSearch(event) {
    const searchQuery = event.detail.toLowerCase();
	console.log(searchQuery)
    if (searchQuery) {
		pokemonData = [{ url: `https://pokeapi.co/api/v2/pokemon/${searchQuery}` }];
	  console.log(pokemonData)
    }else{
		pokemonData = [];
		fetchPokemons("https://pokeapi.co/api/v2/pokemon");
	}
  }
</script>

<svelte:head>
  <title>Pokédex | Home</title>
  <meta name="description" content="Pokédex Demo App" />
</svelte:head>

<Header on:search={handleSearch} />
<section class="container">
  {#each pokemonData as pokemon}
    <Card {pokemon} />
  {/each}
</section>
<button class="load-more" on:click={loadMore}>Load more Pokémon</button>
