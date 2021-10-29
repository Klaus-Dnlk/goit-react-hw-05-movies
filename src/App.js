import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router';
import Container from './components/Container/Container';
import AppBar from './components/AppBar/AppBar';
import './App.css';

const HomePage = lazy(() =>
  import('./views/HomePage'),
); /* webpackChunkName: "HomePage" */
const MoviesPage = lazy(() =>
  import('./views/MoviesPage'),
); /* webpackChunkName: "MoviesPage" */
const NotFoundPage = lazy(() =>
  import('./components/NotFoundPage/NotFoundPage'),
); /* webpackChunkName: "NotFoundPage" */

const MovieDetailsPage = lazy(() =>
  import('./components/MovieDetailsPage/MovieDetailsPage'),
);

export default function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback="Loading...">
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
