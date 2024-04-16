<script>
  import { capitalizeFirstLetter } from "../../../lib/js/reusables";

  export let pokemonType;
</script>

<div
  class="px-10 py-0.5 ms-2 mt-2 type-{pokemonType.name} font-semibold rounded-lg"
>
  {capitalizeFirstLetter(pokemonType.name)}
</div>

<style>
  .type-normal {
    background-color: #a8a878;
  }

  .type-fire {
    background-color: #f08030;
    color: white;
  }

  .type-water {
    background-color: #6890f0;
    color: white;
  }

  .type-electric {
    background-color: #f8d030;
  }

  .type-grass {
    background-color: #78c850;
  }

  .type-ice {
    background-color: #98d8d8;
  }

  .type-fighting {
    background-color: #c03028;
    color: white;
  }

  .type-poison {
    background-color: #a040a0;
    color: white;
  }

  .type-ground {
    background-color: #e0c068;
  }

  .type-flying {
    background-color: #a890f0;
  }

  .type-psychic {
    background-color: #f85888;
    color: white;
  }

  .type-bug {
    background-color: #a8b820;
    color: white;
  }

  .type-rock {
    background-color: #b8a038;
    color: white;
  }

  .type-ghost {
    background-color: #705898;
    color: white;
  }

  .type-dragon {
    background-color: #7038f8;
    color: white;
  }

  .type-dark {
    background-color: #705848;
    color: white;
  }

  .type-steel {
    background-color: #b8b8d0;
  }

  .type-fairy {
    background-color: #f0b6bc;
  }
</style>
