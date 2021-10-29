import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import * as moviesAPI from '../services/services';

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    moviesAPI.fetchMoviesInTrend().then(setMovies);
  }, []);

  return (
    <>
      <div>
        <h1>Trending today</h1>
        <ul>
          {movies &&
            movies.results.map(movie => (
              <li key={movie.id}>
                <NavLink to={`/movies/${movie.id}`}>
                  {movie.title || movie.name}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
