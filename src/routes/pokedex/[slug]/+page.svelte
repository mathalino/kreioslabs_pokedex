<script>
  export let data;
  console.log(data);

  import {
    capitalizeFirstLetter,
    formatPokemonId,
  } from "../../../lib/js/reusables";

  import DisplayData from "./DisplayData.svelte";
</script>

<div class="container">
  <div class="flex justify-center">
    <h1 class="text-3xl font-semibold">
      {capitalizeFirstLetter(data.item.species.name)}
      <span class="text-gray-400">
        #{formatPokemonId(data.item.id)}
      </span>
    </h1>
  </div>
  <div class="grid sm:grid-cols-2 mt-6">
    <div>
      <img
        class="w-full"
        src={data.item.sprites.front_default}
        alt="{data.item.species.name} photo"
      />
    </div>
    <div class="">
      <div
        class="bg-cyan-400 p-6 h-fit grid sm:grid-cols-2 gap-1.5 text-center sm:text-start"
      >
        <DisplayData label="Height" data={data.item.height + "'"} />
        <DisplayData label="Weight" data={data.item.weight + " lbs"} />
        <DisplayData label="Abilities" data={data.item.abilities} />
      </div>

      <div class="">
        
      </div>
    </div>
  </div>
</div>
