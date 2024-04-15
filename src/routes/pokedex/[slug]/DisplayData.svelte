<script>
  export let label;
  export let data;

  import {
    capitalizeFirstLetter,
    formatPokemonId,
  } from "../../../lib/js/reusables";
</script>

<div>
  <span class="font-semibold text-white">{label}</span>
  <p class="font-bold text-xl">
    {#if typeof data === "string"}
      {data}
    {:else}
      {#each data as item, index}
        {#if !item.is_hidden}
          {index > 0 ? ", " : ""}{capitalizeFirstLetter(item.ability.name)}
        {/if}
      {/each}
    {/if}
  </p>
</div>
