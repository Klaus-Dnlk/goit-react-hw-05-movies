import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as moviesAPI from '../../services/services';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    moviesAPI.fetchMovieCredits(movieId).then(setCast);
  }, [movieId]);

  return (
    <>
      <ul>
        {cast &&
          cast.map(e => (
            <li key={e.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${e.profile_path}`}
                alt={e.name}
              />
              <p>{e.name}</p>
              <p>Character: {e.character}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
