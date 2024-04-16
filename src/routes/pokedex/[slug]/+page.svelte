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

  onMount(async () => {
    pokemonTypes = await Promise.all(
      data.item.types.map(async (item) => {
        const response = await fetch(item.type.url);
        const responseData = await response.json();
        pokemonWeaknesses = pokemonWeaknesses.concat(
          responseData.damage_relations.double_damage_from
        );
        return item.type;
      })
    );
  });

  $: console.log(pokemonTypes);
</script>

<div class="container">
  <div class="flex justify-center">
    <h1 class="text-4xl font-bold">
      {capitalizeFirstLetter(data.item.species.name)}
      <span class="text-gray-400">
        #{formatPokemonId(data.item.id)}
      </span>
    </h1>
  </div>
  <div class="grid sm:grid-cols-2 mt-6" style="max-width: 1024px;">
    <div>
      <img
        class="w-full"
        src={data.item.sprites.front_default}
        alt="{data.item.species.name} photo"
      />
    </div>
    <div class="">
      <div
        class="bg-cyan-400 mb-4 p-6 h-fit w-full grid sm:grid-cols-2 gap-2 text-center sm:text-start rounded-lg shadow-lg"
      >
        <DisplayData label="Height" data={data.item.height + "'"} />
        <DisplayData label="Weight" data={data.item.weight + " lbs"} />
        <DisplayData label="Abilities" data={data.item.abilities} />
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
