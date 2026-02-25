import { isFavorite } from "./favorates.js";

export function createBookCard(book, showFavoriteAction = true) {
  const article = document.createElement("article");
  article.className = "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm";
  article.dataset.bookKey = book.key;

  const favorite = isFavorite(book.key);
  const favoriteClass = favorite
    ? "bg-rose-600 hover:bg-rose-700"
    : "bg-sky-700 hover:bg-sky-800";
  const favoriteText = favorite ? "Remove Favorite" : "Add to Favorites";
  const actionButton = showFavoriteAction
    ? `
        <button
          data-action="favorite"
          class="mt-2 w-full rounded-lg px-3 py-2 text-sm font-medium text-white transition ${favoriteClass}"
        >
          ${favoriteText}
        </button>
      `
    : "";
    article.innerHTML = `
    <img src="${book.cover}" alt="Cover of ${book.title}" class="h-72 w-full object-cover" />
    <div class="space-y-2 p-4">
      <h3 class="line-clamp-2 text-lg font-semibold text-slate-900">${book.title}</h3>
      <p class="text-sm text-slate-600">${book.author}</p>
      <p class="text-xs text-slate-500">Published: ${book.year}</p>
      ${actionButton}
    </div>
  `;

  return article;
}

export function renderBooks(grid, books, showFavoriteAction = true) {
  grid.innerHTML = "";
  const fragment = document.createDocumentFragment();

  for (const book of books) {
    fragment.appendChild(createBookCard(book, showFavoriteAction));
  }

  grid.appendChild(fragment);
}
