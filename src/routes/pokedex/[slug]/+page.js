export async function load({ fetch, params }) {
    const current_res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.slug}`);
    const current_data = await current_res.json();

    let current_id = current_data.id;

    let previous_data = null;
    let previous_id = current_id - 1;
    if (previous_id > 0) {
        const previous_res = await fetch(`https://pokeapi.co/api/v2/pokemon/${previous_id}`);
        previous_data = await previous_res.json();
    }

    let next_data = null;
    let next_id = current_id + 1;
    // Check if the next Pokémon ID exceeds the maximum ID
    if (next_id <= 1025) {
        const next_res = await fetch(`https://pokeapi.co/api/v2/pokemon/${next_id}`);
        // Check if the next Pokémon exists
        if (next_res.ok) {
            next_data = await next_res.json();
        }
    }

    return { current: current_data, previous: previous_data, next: next_data };
}
