<script>
  import { onMount } from "svelte";
  import pokedex_logo from "$lib/images/pokedex-logo.png";
  import Card from "./Card.svelte";



  let pokemonUrls = [];
  let allPokemons = [];
  let filteredPokemons = [];
  let loading = true;
  let selectLoading = true;
  let lastPage = 0;
  const perPage = 24;

  

  let filters = {
    s: "",
    sort: "id_asc",
    page: 1,
  };


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  

  const fetchPokemonData = async (urls) => {
    return await Promise.all(
      urls.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        return response.json();
      })
    );
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

  const fetchData = async (url, delay) => {
    await new Promise((resolve) => setTimeout(resolve, delay)); // Introduce delay here
    const response = await fetch(url);
    const data = await response.json();
    pokemonUrls = data.results;

    await fetchPokemonData(pokemonUrls)
      .then(fetchPokemonImages)
      .then((result) => {
        allPokemons = result;
        filteredPokemons = allPokemons.slice(0, filters.page * perPage);
        lastPage = Math.ceil(result.length / perPage);
        loading = false;

      });
  };

  onMount(async () => {
    await fetchData(
      `https://pokeapi.co/api/v2/pokemon?limit=72&offset=0`,
      0
    );
    await fetchData(
      "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0",
      1000
    );

    selectLoading = false;
  });

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

    lastPage = Math.ceil(pokemons.length / perPage);
    filteredPokemons = pokemons.slice(0, filters.page * perPage);
  };

  const loadMore = () => {
    filters.page++;
    filtersChanged();
  };
</script>

<svelte:head>
  <title>Home | Pokédex</title>
  <meta name="description" content="Pokédex Demo App" />
</svelte:head>

<div class="homepage">
  <!-- Navigation -->
  <nav class="nav mt-8">
    <div class="w-full flex justify-center md:justify-start md:col-span-2">
      <div class="w-fit">
        <a href="/">
          <img class="w-52" src={pokedex_logo} alt="Pokedex Logo" />
        </a>
      </div>
    </div>

    <!-- searchbar -->
    <div class="container md:col-span-4">
      <div class="search">
        <input
          type="text"
          placeholder="Search..."
          bind:value={filters.s}
          on:keyup={() => filtersChanged()}
        />
        <select bind:value={filters.sort} on:change={() => filtersChanged()}>
          <option value="id_asc">Lowest Number</option>
          {#if !selectLoading}
            <option value="id_desc">Highest Number</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          {/if}
        </select>
      </div>
      <span class="text-gray-400 text-xs mt-2">
        Search for a Pokémon by name or Pokédex number.
      </span>
    </div>
    <!-- searchbar end -->
  </nav>
  <!-- Navigation end -->

  {#if loading}
    <p class="my-6">Loading all pokemons...</p>
  {:else}
    <!-- card container -->
    <section class="card-container">
      {#each filteredPokemons as pokemon}
        <a data-sveltekit-preload-data href={pokemon.species.name}>
          <Card {pokemon} />
        </a>
      {/each}
    </section>
    <!-- card container end -->
  {/if}

  {#if filters.page < lastPage}
    <button class="kl-btn" on:click={loadMore}>Load more Pokémon</button>
  {/if}

  <button class="fixed bottom-5 right-5 kl-btn" on:click={scrollToTop}>
    <i class="ri-arrow-up-fill"></i>
  </button>
</div>
