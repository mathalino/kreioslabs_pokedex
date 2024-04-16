export async function load({ fetch, params }) {
	const current_res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.slug}`);
	const current_data = await current_res.json();

	let current_id = current_data.id;

	let previous_id = current_id-1;
	const previous_res = await fetch(`https://pokeapi.co/api/v2/pokemon/${previous_id}`);
	const previous_data = await previous_res.json();
	
	let next_id = current_id+1;
	const next_res = await fetch(`https://pokeapi.co/api/v2/pokemon/${next_id}`);
	const next_data = await next_res.json();


	return { current: current_data, previous: previous_data, next: next_data};
}