<script>
  import pokemon_logo from "$lib/images/pokemon-logo.png";
</script>

<header>
  <a href="/">
    <img src={pokemon_logo} alt="SvelteKit" />
  </a>
  <div class="search">
    <form class="w-full">
      <div class="flex items-center">
        <input
          type="text"
          placeholder="Search..."
        />
        <button
          type="submit"
          class=""
        >
          Search
        </button>
      </div>
      <span>
        Search for a Pokémon by name or Pokédex number.
      </span>
    </form>
  </div>
</header>

<style>
</style>
