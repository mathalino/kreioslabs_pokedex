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

<div class="mt-5 w-full grid grid-cols-2 gap-1">
  {#if data.previous}
    <a href="/pokedex/{data.previous.species.name}">
      <div
        class="bg-gray-400 rounded-l-2xl p-4 flex justify-center items-center font-bold text-2xl hover:bg-cyan-500 transition duration-150"
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
        class="bg-gray-400 rounded-r-2xl p-4 flex justify-center items-center font-bold text-2xl hover:bg-cyan-500 transition duration-150"
      >
        <PageName name={data.next.species.name} />
        <PageId id={data.next.id} /> &gt;
      </div>
    </a>
  {:else}
    <div></div>
  {/if}
</div>
<div class="container">
  <div class="flex justify-center">
    <h1 class="text-4xl font-bold">
      {capitalizeFirstLetter(data.current.species.name)}
      <span class="text-gray-400">
        #{formatPokemonId(data.current.id)}
      </span>
    </h1>
  </div>
  <div class="grid md:grid-cols-2 mt-6" style="max-width: 1024px;">
    <div>
      <img
        class="w-full"
        src={data.current.sprites.front_default}
        alt="{data.current.species.name} photo"
      />
    </div>
    <div class="">
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

      <div class="mb-4">
        <h3 class="text-2xl font-bold">Type</h3>
        <div class="flex">
          {#each pokemonTypes as item}
            <PokemonTypes pokemonType={item} />
          {/each}
        </div>
      </div>
      <div class="mb-4">
        <h3 class="text-2xl font-bold">Weaknesses</h3>
        <div class="flex flex-wrap">
          {#each pokemonWeaknesses as item}
            <PokemonTypes pokemonType={item} />
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
