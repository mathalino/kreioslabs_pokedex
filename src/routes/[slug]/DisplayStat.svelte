<script>
  import { formatPokemonId } from "../../lib/js/reusables";

  export let color, title, value;
  function formatStatName(name) {
    switch (name.toLowerCase()) {
      case 'hp':
        return 'HP';
      case 'attack':
        return 'ATK';
      case 'defense':
        return 'DEF';
      case 'special-attack':
        return 'SATK';
      case 'special-defense':
        return 'SDEF';
      case 'speed':
        return 'SPD';
      default:
        return name.toUpperCase();
    }
  }
</script>

<div class="flex flex-row">
  <div class="w-36 text-sm flex justify-between me-3">
    <h3 class="font-bold">{formatStatName(title)}</h3>
    <h3>{formatPokemonId(value)}</h3>
  </div>
  <div class="w-full self-center bg-gray-200 rounded-full h-2.5">
    <div
      class="h-2.5 rounded-full"
      style="width: {(value / 250) * 100}%; background: {color}"
    ></div>
  </div>
</div>
