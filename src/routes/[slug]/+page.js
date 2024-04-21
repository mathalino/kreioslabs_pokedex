import { pokemons } from "../pokemons";
export async function load({ fetch, params }) {

  let pokemonWeaknesses = [];
  let pokemonImmunities = [];
  let pokemonDoubleDamage = [];
  let pokemonTypes = [];
  let pokemonSpecies = [];
  let id = parseInt(params.slug);

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${params.slug}`
  );
  const data = await res.json();
  pokemonSpecies = data;


  const currentFilterData  = pokemons.filter(array => {
    return array.id === id || array.name === params.slug
  });
  const current_data = currentFilterData[0];

  console.log(pokemons)



  async function fetchPokemonTypes() {
    pokemonTypes = await Promise.all(
      current_data.types.map(async (item) => {
        const response = await fetch(item.type.url);
        const responseData = await response.json();
        pokemonWeaknesses = pokemonWeaknesses.concat(
          responseData.damage_relations.double_damage_from
        );
        pokemonDoubleDamage = pokemonDoubleDamage.concat(
          responseData.damage_relations.double_damage_to
        );
        pokemonImmunities = pokemonImmunities.concat(
          responseData.damage_relations.no_damage_from
        );
        return item.type;
      })
    );
  }

  

  let current_id = id;

  let previous_data = null;
  let previous_id = current_id - 1;
  if (previous_id > 0) {
    
    previous_data =  pokemons.filter(array => {
      return array.id === previous_id
    });
  }

  let next_data = null;
  let next_id = current_id + 1;
  if (next_id <= 1025 ) {
    
      next_data = pokemons.filter(array => {
      return array.id === next_id
    });
  }
  

  await fetchPokemonTypes();
   
  return {
    current: { ...current_data},
    previous: previous_data ? previous_data[0] : null,
    next: next_data ? next_data[0] : null,
    pokemonTypes: pokemonTypes,
    pokemonWeaknesses: pokemonWeaknesses,
    pokemonSpecies: pokemonSpecies,
    pokemonDoubleDamage: pokemonDoubleDamage,
    pokemonImmunities: pokemonImmunities,
  };
}
