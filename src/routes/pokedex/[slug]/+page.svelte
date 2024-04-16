<script>
  import { onMount } from "svelte";
  export let data;
  let pokemonWeaknesses = [];
  let pokemonTypes = [];

  import {
    capitalizeFirstLetter,
    formatPokemonId,
  } from "../../../lib/js/reusables";

  import DisplayData from "./DisplayData.svelte";
  import PokemonTypes from "./PokemonTypes.svelte";
  import PageId from "./PageId.svelte";
  import PageName from "./PageName.svelte";

  onMount(async () => {
    pokemonTypes = await Promise.all(
      data.current.types.map(async (item) => {
        const response = await fetch(item.type.url);
        const responseData = await response.json();
        pokemonWeaknesses = pokemonWeaknesses.concat(
          responseData.damage_relations.double_damage_from
        );
        return item.type;
      })
    );
  });

  $: console.log(data);
</script>

<svelte:head>
  <title>{capitalizeFirstLetter(data.current.species.name)} | Pokédex</title>
</svelte:head>

<!-- container -->
<div class="container items-center">
  <!-- directional buttons -->
  <div class="directional-btn-container">
    {#if data.previous}
      <a href="/pokedex/{data.previous.species.name}">
        <div
          class="directional-btn rounded-l-2xl"
        >
          &lt;<PageId id={data.previous.id} />
          <PageName name={data.previous.species.name} />
        </div>
      </a>
    {:else}
      <div></div>
    {/if}
    {#if data.next}
      <a href="/pokedex/{data.next.species.name}">
        <div
          class="directional-btn rounded-r-2xl"
        >
          <PageName name={data.next.species.name} />
          <PageId id={data.next.id} /> &gt;
        </div>
      </a>
    {:else}
      <div></div>
    {/if}
  </div>
  <!-- directional buttons end -->

  
  <!-- title -->
  <div class="flex justify-center mt-2">
    <h1 class="text-3xl font-bold">
      {capitalizeFirstLetter(data.current.species.name)}
      <span class="text-gray-400">
        #{formatPokemonId(data.current.id)}
      </span>
    </h1>
  </div>
  <!-- title end -->
  <!-- details-container -->
  <div class="details-container" style="max-width: 1024px;">
    <div>
      <!-- image -->
      <img
        class="w-full"
        src={data.current.sprites.front_default}
        alt="{data.current.species.name} photo"
      />
      <!-- image end -->
      <!-- stats -->
      <div class="bg-cyan-400 p-4 my-4 rounded-md text-center sm:text-start">
        <h3 class="text-2xl font-bold">Stats</h3>
        {#each data.current.stats as stat}
          <p>
            {capitalizeFirstLetter(stat.stat.name)}: {stat.base_stat}
          </p>
        {/each}
      </div>
      <!-- stats end -->
    </div>
    <div class="">
      <!-- abilities, height, weight -->
      <div
        class="flex flex-col bg-cyan-400 mb-4 p-6 h-fit w-full rounded-lg shadow-lg"
      >
        <div class=" grid md:grid-cols-2 gap-2 text-center md:text-start">
          <DisplayData label="Height" data={data.current.height + "'"} />
          <DisplayData label="Weight" data={data.current.weight + " lbs"} />
        </div>
        <div class="text-center md:text-start mt-3">
          <DisplayData label="Abilities" data={data.current.abilities} />
        </div>
      </div>
      <!-- abilities, height, weight end -->

      <!-- types -->
      <div class="mb-4">
        <h3 class="text-2xl font-bold">Type</h3>
        <div class="flex">
          {#each pokemonTypes as item}
            <PokemonTypes pokemonType={item} />
          {/each}
        </div>
      </div>
      <!-- types end -->
      <!-- weakness -->
      <div class="mb-4">
        <h3 class="text-2xl font-bold">Weaknesses</h3>
        <div class="flex flex-wrap">
          {#each pokemonWeaknesses as item}
            <PokemonTypes pokemonType={item} />
          {/each}
        </div>
      </div>
      <!-- weakness end -->
    </div>
  </div>
  <!-- details-container -->
</div>

<!-- container end -->
