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
  import DisplayStat from "./DisplayStat.svelte";

  console.log(data.current);
</script>

<svelte:head>
  <title>{capitalizeFirstLetter(data.current.species.name)} | Pokédex</title>
</svelte:head>
<div
  class="details-wrapper w-screen h-screen flex flex-col items-center relative"
  style="background: {data.current.types.length > 1
    ? 'linear-gradient(90deg, ' +
      typeColors[data.current.types[0].type.name] +
      ' 50%, ' +
      typeColors[data.current.types[1].type.name] +
      ' 50%)'
    : typeColors[data.current.types[0].type.name]}"
>
  <div class="details-header my-8 flex text-white gap-4">
    <h3 class="font-bold text-3xl">
      {capitalizeFirstLetter(data.current.species.name)}
    </h3>
    <h6 class="self-center font-semibold text-sm">
      <i class="ri-hashtag"></i>{formatPokemonId(data.current.id)}
    </h6>
  </div>
  <div class="details-img z-20">
    <!-- image -->
    <img
      class="w-52 h-52"
      src={data.current.sprites.other.dream_world.front_default}
      alt="{data.current.species.name} photo"
    />
    <!-- image end -->
  </div>
  <div
    class="details-content bg-white overflow-auto p-4 z-10 rounded-2xl shadow-xl gap-3"
    style="min-width: 320px; max-width: 500px; margin-top:-40px;"
  >
    <!-- type -->
    <div class="details-type flex justify-center mt-10">
      {#each data.pokemonTypes as item}
        <PokemonTypes pokemonType={item} />
      {/each}
    </div>
    <!-- type end -->

    <PageTitle color={typeColors[data.current.types[0].type.name]} title="About"/>
    
    <div class="px-3">
      <div class="text-center">
        <span class="text-sm">
          {data.pokemonSpecies.flavor_text_entries[0].flavor_text
            .replace("\f", "\n")
            .replace("\u00ad\n", "")
            .replace("\u00ad", "")
            .replace(" -\n", " - ")
            .replace("-\n", "-")
            .replace("\n", " ")}
        </span>
      </div>
      <!-- abilities, height, weight -->
      <div class="grid grid-cols-2 my-2">
        <DisplayData label="Height" data={data.current.height / 10 + " m"} />
        <DisplayData label="Weight" data={data.current.weight / 10 + " kg"} />
        <DisplayData label="Abilities" data={data.current.abilities} />
        <DisplayData label="Egg Group" data={data.pokemonSpecies.egg_groups} />
      </div>
      <!-- abilities, height, weight end -->
    </div>

    <PageTitle color={typeColors[data.current.types[0].type.name]} title="Stats"/>
      <div class="details-stats px-3 ">
        {#each data.current.stats as stat}
          <DisplayStat color={typeColors[data.current.types[0].type.name]} title={stat.stat.name}  value={stat.base_stat}/>  
        {/each}
        
      </div>
    <PageTitle color={typeColors[data.current.types[0].type.name]} title="Type Effectiveness"/>
    <div class="px-3">
        <div class="w-fit flex  gap-1 items-center">
          <h3 class="text-sm font-bold">Weak against (2x):</h3>
        {#each data.pokemonWeaknesses as item}
          <PokemonTypes pokemonType={item} />
        {/each}
      </div>
        <div class="w-fit flex  gap-1">
          <h3 class="text-sm font-bold">Immune against:</h3>
        {#each data.pokemonImmunities as item}
          <PokemonTypes pokemonType={item} />
        {/each}
      </div>
        <div class="w-fit flex  gap-1">
          <h3 class="text-sm font-bold">Strong against (2x):</h3>
        {#each data.pokemonDoubleDamage as item}
          <PokemonTypes pokemonType={item} />
        {/each}
      </div>
    </div>
  </div>

  <div class="go-home absolute top-5 left-5">
    <a href="/" class="bg-cyan-200 px-6 py-2 rounded-3xl z-40">
      <i class="ri-home-4-fill"></i>
    </a>
  </div>
</div>
