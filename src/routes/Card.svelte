<script>
  import { capitalizeFirstLetter, formatPokemonId } from "../lib/js/reusables";

  export let pokemon;
</script>

<div class="card">
  {#if pokemon}
    <img
      src={pokemon.sprites.front_default}
      alt="{pokemon.species.name} photo"
    />
    <p>#{formatPokemonId(pokemon.id)}</p>
    <h2>{capitalizeFirstLetter(pokemon.species.name)}</h2>
  {/if}
</div>
