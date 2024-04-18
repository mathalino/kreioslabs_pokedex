<script>
  import PokemonTypes from "./PokemonTypes.svelte";

  export let title, pokemonTypes;
</script>

{#if pokemonTypes.length > 0}
  <div class="w-fit flex gap-1 mb-3">
    <h3 class="text-sm font-bold text-nowrap">{title}:</h3>
    <div class="flex flex-wrap gap-2">
      {#each pokemonTypes as item}
        <PokemonTypes pokemonType={item} />
      {/each}
    </div>
  </div>
{/if}
