import { fetchBooks } from "./fetchBooks.js";
import { getFavorites, toggleFavorite } from "./favorates.js";
import { renderBooks } from "./ui.js";

const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const booksGrid = document.getElementById("books-grid");
const loading = document.getElementById("loading");
const emptyState = document.getElementById("empty-state");
const resultLabel = document.getElementById("result-label");

let currentBooks = [];

function showLoading(show) {
  loading.classList.toggle("hidden", !show);
}

function showEmpty(show) {
  emptyState.classList.toggle("hidden", !show);
}

function updateResultLabel() {
  resultLabel.textContent = `${currentBooks.length} book(s) shown | ${getFavorites().length} favorite(s)`;
}

async function loadBooks(query = "bestsellers") {
  try {
    showLoading(true);
    showEmpty(false);

    currentBooks = await fetchBooks(query);
    renderBooks(booksGrid, currentBooks, true);

    showEmpty(currentBooks.length === 0);
    updateResultLabel();
  } catch (error) {
    currentBooks = [];
    booksGrid.innerHTML = "";
    showEmpty(true);
    resultLabel.textContent = "Could not load books. Please try again.";
    console.error(error);
  } finally {
    showLoading(false);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;

  loadBooks(query);
});

booksGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action='favorite']");
  if (!button) return;

  const card = button.closest("article[data-book-key]");
  const key = card?.dataset.bookKey;
  const book = currentBooks.find((item) => item.key === key);
  if (!book) return;

  toggleFavorite(book);
  renderBooks(booksGrid, currentBooks, true);
  updateResultLabel();
});

loadBooks();
