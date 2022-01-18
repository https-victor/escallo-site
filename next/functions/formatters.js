export function formatStrapiObject(data) {
  if (data && data.data) {
    return { id: data.data.id, ...data.data.attributes };
  }
  return {};
}
export function formatStrapiItem(data) {
  if (data) {
    return { id: data.id, ...data.attributes };
  }
  return {};
}
export function formatStrapiArray(array) {
  if (array.data) {
    return array.data.map((data) => formatStrapiItem(data));
  }
  return [];
}
