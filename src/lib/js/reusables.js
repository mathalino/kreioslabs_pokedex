export function capitalizeFirstLetter(string) {
  string = string.replace(/[-_]/g, " ");
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatPokemonId(id) {
  let idString = id.toString();
  if (idString.length <= 3) {
    let zerosNeeded = 3 - idString.length;
    return "0".repeat(zerosNeeded) + idString;
  } else {
    return idString;
  }
}
