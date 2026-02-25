const STORAGE_KEY = "bookExplorerFavorites";

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}
export function isFavorite(bookKey) {
  return getFavorites().some((book) => book.key === bookKey);
}

export function addFavorite(book) {
  const favorites = getFavorites();
  if (favorites.some((item) => item.key === book.key)) return favorites;

  const updated = favorites.concat(book);
  saveFavorites(updated);
  return updated;
}

export function removeFavorite(bookKey) {
  const favorites = getFavorites();
  const updated = favorites.filter((book) => book.key !== bookKey);
  saveFavorites(updated);
  return updated;
}

export function toggleFavorite(book) {
  return isFavorite(book.key) ? removeFavorite(book.key) : addFavorite(book);
}
