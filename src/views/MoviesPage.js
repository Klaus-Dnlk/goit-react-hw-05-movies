import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from '../components/SearchBar/SearchBar';
import * as moviesAPI from '../services/services';

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  const { search } = location;
  const { query } = queryString.parse(search);

  const [searchQuery, setSearchQuery] = useState(query || '');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleSearch = query => {
    setSearchQuery(query);
    setPage(1);
    setData([]);
    history.push({ ...location, search: `query=${query}` });
  };

  const fetchApi = () => {
    moviesAPI
      .fetchMovieBySearch(searchQuery, page)
      .then(data => {
        setData(s => [...s, ...data]);
        setPage(s => s + 1);
      })
      .catch(error => setError(error));
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <ul>
        {data &&
          data.map(movie => (
            <li key={movie.id}>
              <NavLink to={`/movies/${movie.id}`}>
                {movie.title || movie.name}
              </NavLink>
            </li>
          ))}
      </ul>

      <ToastContainer autoClose={2000} />
      {error && error}
    </>
  );
}
