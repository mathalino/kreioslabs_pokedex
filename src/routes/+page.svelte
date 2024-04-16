<script>
  import { onMount } from "svelte";
  import Card from "./Card.svelte";
  import pokemon_logo from "$lib/images/pokemon-logo.png";

  let pokemonUrls = [];

  let allPokemons,
    filteredPokemons = [];
  let filters = {
    s: "",
    sort: "id_asc",
    page: 1,
  };
  
  let loading = true;
  const perPage = 8;

  onMount(async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0");
    const data = await response.json();
    pokemonUrls = data.results;

    fetchPokemons().then((result) => {
      allPokemons = result;
      filteredPokemons = result.slice(0, filters.page * perPage);
      loading = false;
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
    let pokemons = allPokemons.filter(
      (p) =>
        p.species.name.indexOf(filters.s.toLowerCase()) >= 0 ||
        p.id.toString().indexOf(filters.s) >= 0
    );

    if (filters.sort === "asc" || filters.sort === "desc") {
      pokemons.sort((a, b) => {
        return (
          (filters.sort === "asc" ? 1 : -1) *
          a.species.name.localeCompare(b.species.name)
        );
      });
    }

    if (filters.sort === "id_asc" || filters.sort === "id_desc") {
      pokemons.sort((a, b) => {
        return (filters.sort === "id_asc" ? 1 : -1) * (a.id - b.id);
      });
    }

    filteredPokemons = pokemons.slice(0, filters.page * perPage);
  };


  const loadMore = () =>{
    filters.page++;
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
    <div class="w-full grid grid-cols-4">
      <input
        type="text"
        placeholder="Search..."
        bind:value={filters.s}
        on:keyup={() => filtersChanged()}
      />
      <div class="">
        <select bind:value={filters.sort} on:change={() => filtersChanged()}>
          <option value="id_asc">Lowest Number</option>
          <option value="id_desc">Highest Number</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
    </div>
    <span> Search for a Pokémon by name or Pokédex number. </span>
  </div>
</header>

{#if loading}
  <p class="mb-6">Loading all pokemons...</p>
{:else}
  <section class="card-container container">
    {#each filteredPokemons as pokemon}
      <a href={`pokedex/${pokemon.species.name}`}>
        <Card {pokemon} />
      </a>
    {/each}
  </section>
{/if}

<button class="load-more" on:click={loadMore}>Load more Pokémon</button>
