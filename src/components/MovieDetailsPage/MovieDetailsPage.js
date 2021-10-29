import { useState, useEffect } from 'react';
import { lazy, Suspense } from 'react';
import { useParams } from 'react-router';
import {
  NavLink,
  Route,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import * as moviesAPI from '../../services/services';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

export default function MovieDetailsPage() {
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState();
  const location = useLocation();
  console.log('MovieDetailsPage:', location);
  const history = useHistory();

  useEffect(() => {
    moviesAPI.fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {movie && (
        <>
          <button type="button" onClick={onGoBack}>
            Back
          </button>
          <div className={s.movieDetailBox}>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title || movie.name}
              className={s.detailBoxItem}
            />
            <div className={s.detailBoxItem}>
              <h2>
                {movie.title || movie.name}({movie.release_date.substr(0, 4)})
              </h2>
              <p>User Score {movie.vote_average * 10}%</p>
              <p className={s.title}>Overview</p>
              <p>{movie.overview}</p>
              <p className={s.title}>Genres</p>
              <p>{movie.genres.map(e => e.name).join(' ')}</p>
            </div>
          </div>
        </>
      )}

      {
        <div className={s.additionalList}>
          <p>Additional infomation</p>

          <ul>
            <NavLink
              to={{ pathname: `${url}/cast`, state: { ...location.state } }}
              className={s.additionalItem}
            >
              Cast
            </NavLink>
            <NavLink
              to={{ pathname: `${url}/reviews`, state: { ...location.state } }}
              className={s.additionalItem}
            >
              Reviews
            </NavLink>
          </ul>
        </div>
      }

      <Suspense fallback="Loading...">
        <Route path={`${path}/cast`}>
          <Cast />
        </Route>

        <Route path={`${path}/reviews`}>
          <Reviews />
        </Route>
      </Suspense>
    </>
  );
}
