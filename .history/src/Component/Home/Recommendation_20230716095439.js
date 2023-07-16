import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecommendationMoviesAction } from '../../Redux/Actions/MoviesAction';
import Titles from '../Titles';
import { BsCollectionFill } from 'react-icons/bs';
import Movie from '../Movie';
import Loader from '../Notification/Loader';
import { Empty } from '../Notification/Empty';

function RecommendationMovies(userId) {
  const dispatch = useDispatch();
  // const { isLoading, movies } = useSelector((state) => state.moviesRecommendation);
  let movies = []
  let isLoading = true

  useEffect(() => {
    dispatch(getRecommendationMoviesAction(userId));
  }, [dispatch, userId]);

  return (
    <div className="my-16">
      <Titles title="Recommendation For You" Icon={BsCollectionFill} />
      {isLoading ? (
        <Loader />
      ) : movies.length > 0 ? (
        <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {movies.slice(0, 8).map((movie, index) => (
            <Movie key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <Empty message="It seems like we don't have any movie recommendations for you." />
        </div>
      )}
    </div>
  );
}

export default RecommendationMovies;
