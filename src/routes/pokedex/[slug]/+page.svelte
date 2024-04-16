<script>
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



</script>

<svelte:head>
  <title>{capitalizeFirstLetter(data.current.species.name)} | Pokédex</title>
</svelte:head>

<!-- container -->
<div class="container items-center" style="max-width: 600px">
  <!-- directional buttons -->
  <div class="directional-btn-container">
    {#if data.previous}
      <a href="/pokedex/{data.previous.species.name}">
        <div class="directional-btn rounded-l-2xl">
          &lt;<PageId id={data.previous.id} />
          <PageName name={data.previous.species.name} />
        </div>
      </a>
    {:else}
      <div></div>
    {/if}
    {#if data.next}
      <a href="/pokedex/{data.next.species.name}">
        <div class="directional-btn rounded-r-2xl">
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
  <div
    class="flex justify-center mt-2 w-full p-5 type-{data.current.types[0].type
      .name}"
  >
    <h1 class="text-2xl font-semibold">
      {capitalizeFirstLetter(data.current.species.name)}
    </h1>
  </div>
  <!-- title end -->
  <!-- details-container -->
  <div class="container">
    <div class="flex">
      <!-- image -->
      <img
        class="w-24 h-24 sm:w-40 sm:h-40"
        src={data.current.sprites.front_default}
        alt="{data.current.species.name} photo"
      />
      <!-- image end -->

      <div class="w-full">
        <div class="flex justify-between w-full">
          <!-- types -->
          <div class="flex">
            {#each data.pokemonTypes as item}
              <PokemonTypes pokemonType={item} />
            {/each}
          </div>
          <!-- types end -->
          <span class="sm:text-2xl">#{formatPokemonId(data.current.id)}</span>
        </div>

        <!-- stats -->
        <div class="px-4 py-2">
          {#each data.current.stats as stat}
            <div class="grid grid-cols-3">
              <span class="col-span-2">
                {capitalizeFirstLetter(stat.stat.name)}
              </span>
              <span>
                {stat.base_stat}
              </span>
            </div>
          {/each}
        </div>
        <!-- stats end -->
      </div>
    </div>
    <!-- profile -->
    <div class="">
      <!-- profile title -->
      <div class="p-2 type-{data.current.types[0].type.name}">
        <h1 class="text-base sm:text-xl font-semibold">Profile</h1>
      </div>
      <!-- profile title end -->
      <!-- abilities, height, weight -->
      <div class="flex flex-col p-6 h-fit w-full rounded-lg">
        <div class=" grid grid-cols-2 gap-2 md:text-start">
          <DisplayData label="Height" data={data.current.height / 10 + " m"} />
          <DisplayData label="Weight" data={data.current.weight / 10 + " kg"} />
        </div>
        <div class="md:text-start mt-3">
          <DisplayData label="Abilities" data={data.current.abilities} />
        </div>
      </div>
      <!-- abilities, height, weight end -->
    </div>
    <!-- profile end -->

    <!-- weakness -->
    <div class="">
      <!-- weakness title -->
      <div class="p-2 type-{data.current.types[0].type.name}">
        <h1 class="text-base sm:text-xl font-semibold">Weak against</h1>
      </div>
      <!-- weakness title end -->
      <div class="flex p-6">
        {#each data.pokemonWeaknesses as item}
          <PokemonTypes pokemonType={item} />
        {/each}
      </div>
    </div>
    <!-- weakness end -->
  </div>
  <!-- details-container -->
</div>

<!-- container end -->
