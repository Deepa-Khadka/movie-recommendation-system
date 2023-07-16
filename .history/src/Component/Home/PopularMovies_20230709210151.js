import React from 'react';
import { connect } from 'react-redux';
import Titles from '../Titles';
import { BsCollectionFill } from 'react-icons/bs';
import Movie from '../Movie';
import Loader from '../Notification/Loader';
import { Empty } from '../Notification/Empty';

function PopularMovies({ isLoading, recommendedMovies }) {
  return (
    <div className="my-16">
      <Titles title="Recommendation For You" Icon={BsCollectionFill} />
      {isLoading ? (
        <Loader />
      ) : recommendedMovies.length > 0 ? (
        <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {recommendedMovies.slice(0, 8).map((movie, index) => (
            <Movie key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <Empty message="It seems like we don't have any movie recommendations." />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  recommendedMovies: state.moviesRecommendationReducer.movies,
  isLoading: state.moviesRecommendationReducer.isLoading,
});

export default connect(mapStateToProps)(PopularMovies);
