<script>
  import {
    capitalizeFirstLetter,
    formatPokemonId,
    typeColors,
  } from "../lib/js/reusables";

  export let pokemon;
</script>

{#if pokemon}
  <div class="card">
    <div class="w-44 h-44 relative">
      <span class="absolute top-2 right-2 text-sm font-semibold"
        ><i class="ri-hashtag"></i>{formatPokemonId(pokemon.id)}</span
      >
      <img
        src={pokemon.sprites.other.dream_world.front_default}
        alt="{pokemon.species.name} photo"
        class="w-20 h-20 absolute inset-0 m-auto"
      />
      <div
        class="h-20 -z-10 px-2 py-1 flex items-center justify-center absolute bottom-0 w-full rounded-lg bg-gray-300"
        style="background: {pokemon.types.length > 1
          ? 'linear-gradient(90deg, ' +
            typeColors[pokemon.types[0].type.name] +
            ' 50%, ' +
            typeColors[pokemon.types[1].type.name] +
            ' 50%)'
          : typeColors[pokemon.types[0].type.name]}"
      >
      <span class="font-bold mt-3">{capitalizeFirstLetter(pokemon.species.name)}</span>


      </div>
    </div>
  </div>
{/if}