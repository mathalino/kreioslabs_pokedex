<script>
  export let label;
  export let data;

  import {
    capitalizeFirstLetter
  } from "../../../lib/js/reusables";
</script>

<div class="font-bold">
  <span class="text-xl text-white">{label}</span>
  <p class="text-2xl">
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
