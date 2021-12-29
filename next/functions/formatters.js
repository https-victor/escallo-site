export function formatStrapiObject(data) {
  return { id: data.data.id, ...data.data.attributes };
}
export function formatStrapiItem(data) {
  return { id: data.id, ...data.attributes };
}
export function formatStrapiArray(array) {
  return array.data.map((data) => formatStrapiItem(data));
}
