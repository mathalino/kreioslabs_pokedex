<script>
  export let pokemonType;
</script>

<div
  class="px-2 p-0.5 type-{pokemonType.name} font-extrabold h-fit text-xs rounded-lg"
>
  {pokemonType.name.toUpperCase()}
</div>

