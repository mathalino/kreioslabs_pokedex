<script>
  export let label;
  export let data;

  import {
    capitalizeFirstLetter
  } from "../../lib/js/reusables";
</script>

<div class="flex gap-4 text-sm">
  <span class="font-bold">{label}:</span>
  <p class="">
    {#if typeof data === "string"}
      {data}
    {:else}
      {#each data as item, index}
        
          {index > 0 ? ", " : ""}{capitalizeFirstLetter(item.name || item.ability.name)}
      {/each}
    {/if}
  </p>
</div>
