<script>
  export let data;
  import pokedex_logo from "$lib/images/pokedex-logo.png";

  import {
    capitalizeFirstLetter,
    formatPokemonId,
    typeColors,
  } from "../../lib/js/reusables";

  import DisplayData from "./DisplayData.svelte";
  import PokemonTypes from "./PokemonTypes.svelte";
  import PageId from "./PageId.svelte";
  import PageName from "./PageName.svelte";
  import PageTitle from "./PageTitle.svelte";


  let backgroundColor = typeColors[data.current.types[0].type.name];
</script>

<svelte:head>
  <title>{capitalizeFirstLetter(data.current.species.name)} | Pokédex</title>
</svelte:head>


<div class="details-wrapper w-screen h-screen" style="background-color: {backgroundColor}">
  
</div>