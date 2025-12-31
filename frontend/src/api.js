const BASE = window.location.origin;

export async function getPair() {
  const res = await fetch(`${BASE}/api/movie/pair`);
  return res.json();
}

export async function getMovieDetails(id) {
  const res = await fetch(`${BASE}/api/movie/${id}`);
  return res.json();
}

export async function recommend(genres = [], exclude = []) {
  const res = await fetch(`${BASE}/api/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ genres, exclude })
  });
  return res.json();
}
