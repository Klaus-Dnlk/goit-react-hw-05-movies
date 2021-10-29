const BASE_URL = 'https://api.themoviedb.org/3';
const api_key = 'f4526657187e13f9373a70c365e29292';

async function fetchWithErrorHandling(url = '', config = {}) {
  const r = await fetch(url, config);
  return r.ok ? await r.json() : Promise.reject(new Error('Not found'));
}

export function fetchMoviesInTrend() {
  return fetchWithErrorHandling(
    `${BASE_URL}/trending/movie/day?api_key=${api_key}`,
  );
}

// 2. поиск кинофильма по ключевому слову на странице фильмов
// SEARCH-MOVIES

export function fetchMovieBySearch(query = '', page = 1) {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${api_key}&query=${query}&page=${page}`,
  ).then(data => data.results);
}

// 3. запрос полной информации о фильме для страницы кинофильма
// MOVIE DETAILS

export function fetchMovieDetails(movie_id) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movie_id}?api_key=${api_key}`,
  );
}

// 4. запрос информации о актёрском составе для страницы кинофильма
// CAST   (CERDITS)

export function fetchMovieCredits(movie_id) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movie_id}/credits?api_key=${api_key}`,
  ).then(data => data.cast);
}

// 5. запрос обзоров для страницы кинофильма
// REVIEWS

export function fetchMovieReview(movie_id) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movie_id}/reviews?api_key=${api_key}`,
  ).then(data => data.results);
}
