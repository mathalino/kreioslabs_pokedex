export async function load({ fetch, params }) {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.slug}`);
	const item = await res.json();

	return { item };
}