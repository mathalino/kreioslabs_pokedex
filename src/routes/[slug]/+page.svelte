<script>
  export let data;
  import {
    capitalizeFirstLetter,
    formatPokemonId,
    typeColors,
  } from "../../lib/js/reusables";

  import DisplayData from "./DisplayData.svelte";
  import PokemonTypes from "./PokemonTypes.svelte";
  import PageTitle from "./PageTitle.svelte";
  import DisplayStat from "./DisplayStat.svelte";
  import TypeEffectiveness from "./TypeEffectiveness.svelte";

  function getEnglishFlavorText(pokemonSpecies) {
    for (let entry of pokemonSpecies.flavor_text_entries) {
      if (entry.language.name === "en") {
        let flavor = entry.flavor_text
          .replace("\f", "\n")
          .replace("\u00ad\n", "")
          .replace("\u00ad", "")
          .replace(" -\n", " - ")
          .replace("-\n", "-")
          .replace("\n", " ");
        return flavor;
      }
    }
    return "";
  }



</script>

<svelte:head>
  <title>{capitalizeFirstLetter(data.current.species.name)} | Pokédex</title>
</svelte:head>
<div
  class="details-wrapper"
  style="background: {data.current.types.length > 1
    ? 'linear-gradient(90deg, ' +
      typeColors[data.current.types[0].type.name] +
      ' 50%, ' +
      typeColors[data.current.types[1].type.name] +
      ' 50%)'
    : typeColors[data.current.types[0].type.name]}"
>
  <div class="details-header">
    <h3 class="font-bold text-3xl">
      {capitalizeFirstLetter(data.current.species.name)}
    </h3>
    <h6 class="self-center font-semibold text-sm">
      <i class="ri-hashtag"></i>{formatPokemonId(data.current.id)}
    </h6>
  </div>
  <div class="z-10 flex items-center sm:gap-10">
    {#if data.previous}
      <a
        data-sveltekit-preload-data
        href="/{data.previous.species.name}"
        class="kl-btn"
      >
        <i class="ri-arrow-left-line"></i>
      </a>
    {:else}
      <div class="bg-transparent px-6">
        <i class="ri-arrow-left-line text-transparent"></i>
      </div>
    {/if}
    <!-- image -->
    <img
      class="w-52 h-52"
      src={data.current.pokemonImg}
      alt="{data.current.species.name} photo"
    />
    <!-- image end -->
    {#if data.next}
      <a
        data-sveltekit-preload-data
        href="/{data.next.species.name}"
        class="kl-btn"
      >
        <i class="ri-arrow-right-line"></i>
      </a>
    {:else}
      <div class="bg-transparent px-6">
        <i class="ri-arrow-right-line text-transparent"></i>
      </div>
    {/if}
  </div>
  <div class="details-content">
    <!-- type -->
    <div class="details-type">
      {#each data.pokemonTypes as item}
        <PokemonTypes pokemonType={item} />
      {/each}
    </div>
    <!-- type end -->

    <PageTitle color={typeColors[data.current.types[0].type.name]} title="About" />

    <div class="px-3">
      <div class="text-center">
        <span class="text-sm">
          {getEnglishFlavorText(data.pokemonSpecies)}
        </span>
      </div>
      <!-- abilities, height, weight -->
      <div class="details-about">
        <DisplayData label="Height" data={data.current.height / 10 + " m"} />
        <DisplayData label="Weight" data={data.current.weight / 10 + " kg"} />
        <DisplayData label="Abilities" data={data.current.abilities} />
        <DisplayData label="Egg Group" data={data.pokemonSpecies.egg_groups} />
      </div>
      <!-- abilities, height, weight end -->
    </div>

    <PageTitle color={typeColors[data.current.types[0].type.name]} title="Stats" />
    <div class="px-3">
      {#each data.current.stats as stat}
        <DisplayStat
          color={typeColors[data.current.types[0].type.name]}
          title={stat.stat.name}
          value={stat.base_stat}
        />
      {/each}
    </div>
    <PageTitle color={typeColors[data.current.types[0].type.name]} title="Type Effectiveness" />
    <div class="px-3">
      <TypeEffectiveness
        pokemonTypes={data.pokemonWeaknesses}
        title="Weak against (2x)"
      />
      <TypeEffectiveness
        pokemonTypes={data.pokemonDoubleDamage}
        title="Strong against (2x)"
      />
      <TypeEffectiveness
        pokemonTypes={data.pokemonImmunities}
        title="Immune against"
      />
    </div>
  </div>
</div>
