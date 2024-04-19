export async function load({ fetch, params }) {
  let pokemonWeaknesses = [];
  let pokemonImmunities = [];
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

  // Fetch image data so it wont reload when previouse/next
  const fetchImageData = (imageUrl) => {
    return new Promise((resolve, reject) => {
      fetch(imageUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch image");
          }
          return response.blob();
        })
        .then((blob) => {
          const imgUrl = URL.createObjectURL(blob);
          resolve(imgUrl);
        })
        .catch((error) => reject(error));
    });
  };

  const currentImageUrl = current_data.sprites.other.home.front_default;
  const currentImgUrl = await fetchImageData(currentImageUrl);

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
  while (next_id <= 1025 && !next_data) {
    const next_res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${next_id}`
    );
    // Check if the next Pokémon exists
    if (next_res.ok) {
      next_data = await next_res.json();
    } else {
      // If the next Pokémon doesn't exist, increment the ID and try again
      next_id++;
    }
  }
  

  await fetchPokemonTypes();
  
  return {
    current: { ...current_data, pokemonImg: currentImgUrl },
    previous: previous_data,
    next: next_data,
    pokemonTypes: pokemonTypes,
    pokemonWeaknesses: pokemonWeaknesses,
    pokemonSpecies: pokemonSpecies,
    pokemonDoubleDamage: pokemonDoubleDamage,
    pokemonImmunities: pokemonImmunities,
  };
}
