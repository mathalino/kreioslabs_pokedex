<script>
  import { capitalizeFirstLetter } from "../../../lib/js/reusables";

  export let pokemonType;
</script>

<div
  class="px-2 py-0.5 ms-2 type-{pokemonType.name} font-extrabold h-fit text-sm sm:text-base"
>
  {pokemonType.name.toUpperCase()}
</div>

