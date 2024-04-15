import { error } from "@sveltejs/kit";


export function load({ params }) {
  const id = params.id;
    return {
      id: id
    };
}
