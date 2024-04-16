<script>
  import { onMount } from "svelte";
  import Card from "./Card.svelte";
  import Header from "./Header.svelte";
  import pokemon_logo from "$lib/images/pokemon-logo.png";

  let pokemonUrls = [];

  let pokemonData = [];
  let morePokemons = "";
  let isLoading = false;
  let hasLoadMoreButton = true;

  let pokemons = [];
  let allPokemons,
    filteredPokemons = [];
  let filters = {
    s: "",
  };

  onMount(async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const data = await response.json();
    pokemonUrls = data.results;
    console.log(pokemonUrls);

    fetchPokemons().then((result) => {
      allPokemons = result;
      filteredPokemons = result;
    });
  });
  const fetchPokemons = async () => {
    const newPokemons = await Promise.all(
      pokemonUrls.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        return response.json();
      })
    );
    return newPokemons;
  };

    const filtersChanged = () => {
      let pokemons = allPokemons.filter(p => p.species.name.indexOf(filters.s.toLowerCase()) >= 0 || p.id.toString().indexOf(filters.s) >= 0);

      filteredPokemons = pokemons;
  }

  const search = s =>{
    filters.s = s;
    filtersChanged();
  }

</script>

<svelte:head>
  <title>Pokédex | Home</title>
  <meta name="description" content="Pokédex Demo App" />
</svelte:head>

<header>
  <a href="/" onclick="window.location.reload();">
    <img src={pokemon_logo} alt="Pokemon Logo" />
  </a>
  <div class="search">
    <input
      type="text"
      placeholder="Search..."
      on:keyup={(e) => search(e.target.value)}
    />
    <span> Search for a Pokémon by name or Pokédex number. </span>
  </div>
</header>

<section class="card-container container">
  {#each filteredPokemons as pokemon}
    <!-- <a href={`pokedex/${pokemon.name}`}> -->
      <Card {pokemon} />
    <!-- </a> -->
  {/each}
</section>

<!-- {#if hasLoadMoreButton}
  <button class="load-more" on:click={loadMore}> Load more Pokémon </button>
{/if} -->
