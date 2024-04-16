<script>
  import { onMount } from "svelte";
  import { capitalizeFirstLetter, formatPokemonId } from "../lib/js/reusables";

  export let pokemon;
  let pokemonTypes = [];
  pokemon.types.forEach((poke) => pokemonTypes.push(poke.type.name));

  const typeColors = {
    normal: "#a8a878",
    fire: "#f08030",
    water: "#6890f0",
    electric: "#f8d030",
    grass: "#78c850",
    ice: "#98d8d8",
    fighting: "#c03028",
    poison: "#a040a0",
    ground: "#e0c068",
    flying: "#a890f0",
    psychic: "#f85888",
    bug: "#a8b820",
    rock: "#b8a038",
    ghost: "#705898",
    dragon: "#7038f8",
    dark: "#705848",
    steel: "#b8b8d0",
    fairy: "#f0b6bc",
  };
  console.log("------");
  console.log(pokemonTypes.length);
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
