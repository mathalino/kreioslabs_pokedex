<script>
  import { onMount } from 'svelte';
  import Card from '../../Card.svelte';

    export let data;
    let pokemon;
    async function searchPokemon(){
        try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.id}`);
        if (response.status === 404) {
          throw new Error("No Pokémon Mathched Your Search!");
        }
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }
        const responsedata = await response.json();
        pokemon = responsedata;
        console.log(pokemon);
      } catch (err) {
        // error = err.message;
      }
    }
    onMount(()=>{
        searchPokemon();
    })
</script>

<Card {pokemon}/>