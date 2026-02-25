import { getFavorites, toggleFavorite } from "./favorates.js";
import { renderBooks } from "./ui.js";

const favoritesGrid = document.getElementById("favorites-grid");
const favoritesCount = document.getElementById("favorites-count");
const emptyFavorites = document.getElementById("empty-favorites");

function renderFavorites() {
  const favorites = getFavorites();
  renderBooks(favoritesGrid, favorites, true);
  favoritesCount.textContent = `${favorites.length} favorite book(s)`;
  emptyFavorites.classList.toggle("hidden", favorites.length > 0);
}

favoritesGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action='favorite']");
  if (!button) return;

  const card = button.closest("article[data-book-key]");
  const key = card?.dataset.bookKey;
  if (!key) return;

  const favorites = getFavorites();
  const book = favorites.find((item) => item.key === key);
  if (!book) return;

  toggleFavorite(book);
  renderFavorites();
});

renderFavorites();
