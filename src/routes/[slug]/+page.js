export async function load({ fetch, params }) {
    let pokemonWeaknesses = [];
    let pokemonImmunities = [];
    let pokemonNormalDamage = [];
    let pokemonDoubleDamage = [];
    let pokemonTypes = [];
    let pokemonSpecies = [];
    
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${params.slug}`
    );
    const data = await res.json();
    pokemonSpecies = data;

    const current_res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${params.slug}`
    );
    const current_data = await current_res.json();
  
    async function fetchPokemonTypes() {
      pokemonTypes = await Promise.all(
        current_data.types.map(async (item) => {
          const response = await fetch(item.type.url);
          const responseData = await response.json();
          pokemonWeaknesses = pokemonWeaknesses.concat(responseData.damage_relations.double_damage_from);
          pokemonDoubleDamage = pokemonDoubleDamage.concat(responseData.damage_relations.double_damage_to);
          pokemonImmunities = pokemonImmunities.concat(responseData.damage_relations.no_damage_from);
          return item.type;
        })
      );
    }
  
    await fetchPokemonTypes(); // Call fetchPokemonTypes to populate pokemonTypes and pokemonWeaknesses
  
    let current_id = current_data.id;
  
    let previous_data = null;
    let previous_id = current_id - 1;
    if (previous_id > 0) {
      const previous_res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${previous_id}`
      );
      previous_data = await previous_res.json();
    }
  
    let next_data = null;
    let next_id = current_id + 1;
    // Check if the next Pokémon ID exceeds the maximum ID
    if (next_id <= 1025) {
      const next_res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${next_id}`
      );
      // Check if the next Pokémon exists
      if (next_res.ok) {
        next_data = await next_res.json();
      }
    }
  
    return { current: current_data, previous: previous_data, next: next_data, pokemonTypes: pokemonTypes, pokemonWeaknesses: pokemonWeaknesses, pokemonSpecies:pokemonSpecies, pokemonDoubleDamage: pokemonDoubleDamage, pokemonImmunities: pokemonImmunities};
  }
  