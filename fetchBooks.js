const API_BASE = "https://openlibrary.org/search.json";

function mapBook(doc) {
  const author = doc.author_name?.[0] || "Unknown Author";
  const cover = doc.cover_i
    ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
    : "https://placehold.co/260x380/e2e8f0/475569?text=No+Cover";

  return {
    key: doc.key,
    title: doc.title || "Untitled",
    author,
    year: doc.first_publish_year || "N/A",
    cover,
  };
}

export async function fetchBooks(query = "bestsellers", limit = 16) {
  const url = `${API_BASE}?q=${encodeURIComponent(query)}&limit=${limit}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }