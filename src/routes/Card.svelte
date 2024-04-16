<script>
  import { onMount } from "svelte";
  import { capitalizeFirstLetter, formatPokemonId, typeColors } from "../lib/js/reusables";

  export let pokemon;
  let pokemonTypes = [];
  pokemon.types.forEach((poke) => pokemonTypes.push(poke.type.name));

</script>

{#if pokemon}
  <div
    class="card"
    style="background: {pokemonTypes.length > 1
      ? 'linear-gradient(90deg, ' +
        typeColors[pokemonTypes[0]] +
        ' 50%, ' +
        typeColors[pokemonTypes[1]] +
        ' 50%)'
      : typeColors[pokemonTypes[0]]}"
  >
    <img
      src={pokemon.sprites.front_default}
      alt="{pokemon.species.name} photo"
      class="w-full"
    />
    <div class="text-white flex justify-between p-2 absolute bottom-0 w-full rounded-b-lg" style="background-color: rgba(0,0,0,.5);">
      <span>#{formatPokemonId(pokemon.id)}</span>
      <h2>{capitalizeFirstLetter(pokemon.species.name)}</h2>
    </div>
  </div>
{/if}
