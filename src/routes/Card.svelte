<script>
  import { capitalizeFirstLetter, formatPokemonId, typeColors } from "../lib/js/reusables";

  export let pokemon;
</script>

{#if pokemon}
  <div
    class="card"
    style="background: {pokemon.types.length > 1
      ? 'linear-gradient(90deg, ' +
        typeColors[pokemon.types[0].type.name] +
        ' 50%, ' +
        typeColors[pokemon.types[1].type.name] +
        ' 50%)'
      : typeColors[pokemon.types[0].type.name]}"
  >
    <img
      src={pokemon.sprites.front_default}
      alt="{pokemon.species.name} photo"
      class="w-full"
    />
    <div class="flex justify-between px-2 py-1 absolute bottom-0 w-full rounded-b-lg" style="background-color: rgba(0,0,0,.5);">
      <span>#{formatPokemonId(pokemon.id)}</span>
      <span>{capitalizeFirstLetter(pokemon.species.name)}</span>
    </div>
  </div>
{/if}
