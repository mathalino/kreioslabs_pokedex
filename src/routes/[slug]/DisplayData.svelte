<script>
  export let label;
  export let data;

  import {
    capitalizeFirstLetter
  } from "../../lib/js/reusables";
</script>

<div class="flex gap-4 text-sm sm:text-xl">
  <span class="font-bold">{label}:</span>
  <p class="">
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
