import { pokemons } from "./pokemons";
export const load = async (loadEvent) => {
    const { fetch, params, route, url, parent } = loadEvent;

    const parentData = await parent();

    // console.log(pokemons)

}