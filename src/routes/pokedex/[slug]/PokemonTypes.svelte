<script>
  import { capitalizeFirstLetter } from "../../../lib/js/reusables";

  export let pokemonType;
</script>

<div
  class="px-10 py-0.5 ms-2 mt-2 type-{pokemonType.name} font-semibold rounded-lg"
>
  {capitalizeFirstLetter(pokemonType.name)}
</div>

