// RecommendedMovies.js

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import Movie from '../components/Movie';
import { getRecommendationMovies } from '../redux/moviesActions';

const RecommendedMovies = ({ isLoading, movies, getRecommendationMovies, userId, isOldUser }) => {
  useEffect(() => {
    if (isOldUser) {
      // Fetch recommendation movies for existing user
      getRecommendationMovies(userId);
    } else {
      // Fetch top rated movies for new user
      getRecommendationMovies();
    }
  }, [getRecommendationMovies, userId, isOldUser]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h2>Recommended Movies</h2>
      {movies.length > 0 ? (
        <div>
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No recommended movies found.</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.movies.isLoading,
  movies: state.movies.movies,
  userId: state.auth.userId, // Assuming you have a userId stored in the auth state
  isOldUser: state.auth.isOldUser // Assuming you have a flag to indicate if the user is old or new
});

const mapDispatchToProps = {
  getRecommendationMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedMovies);
