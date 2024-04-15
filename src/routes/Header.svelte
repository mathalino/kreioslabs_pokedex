<script>
  import pokemon_logo from "$lib/images/pokemon-logo.png";
  import { createEventDispatcher } from "svelte";

  // Dispatch custom event to communicate with parent component
  const dispatch = createEventDispatcher();

  let searchQuery = "";

  function handleSubmit(event) {
    event.preventDefault();
    dispatch("search", searchQuery);
  }
</script>

<header>
  <a href="/" onclick="window.location.reload();">
    <img src={pokemon_logo} alt="Pokemon Logo" />
  </a>
  <div class="search">
    <form class="w-full" on:submit={handleSubmit}>
      <div class="flex items-center">
        <input type="text" placeholder="Search..." bind:value={searchQuery} />
        <button type="submit" class=""> Search </button>
      </div>
      <span> Search for a Pokémon by name or Pokédex number. </span>
    </form>
  </div>
</header>

<style>
</style>
