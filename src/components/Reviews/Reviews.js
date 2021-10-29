import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as moviesAPI from '../../services/services';
import s from './Reviews.module.css';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    moviesAPI.fetchMovieReview(movieId).then(setReviews);
  }, [movieId]);

  const noReview = reviews.length === 0;

  return (
    <>
      <ul>
        {reviews &&
          reviews.map(e => (
            <li key={e.id}>
              <p className={s.author}>{e.author}</p>
              <p>{e.content}</p>
            </li>
          ))}
      </ul>

      {noReview && <p>There is no reviews</p>}
    </>
  );
}
