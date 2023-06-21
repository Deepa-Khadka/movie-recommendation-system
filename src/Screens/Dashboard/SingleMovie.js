// SingleMovie.js

import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import MovieCasts from "../../Component/Single/MovieCasts";
import { useParams } from "react-router-dom";
import MoviesInfo from "../../Component/Single/MoviesInfo";
import MovieRates from "../../Component/Single/MovieRates";
import Titles from "../../Component/Titles";
import { BsCollectionFill } from "react-icons/bs";
import Movie from "../../Component/Movie";
import ShareModal from "../../Component/Modals/ShareModal";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../../Redux/Actions/MoviesAction";
import Loader from "../../Component/Notification/Loader";
import { RiMovie2Line } from "react-icons/ri";

function SingleMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  //use Selector
  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );
  const { movies } = useSelector((state) => state.getAllMovies);
  //related movie
  const RelatedMovies = movies?.filter((m) => m.category === movie?.category);

  //use Effect
  useEffect(() => {
    //movie id
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5  mb-4 rounded-full bg-dry text-subMain text-4xl ">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">Something went wrong</p>
        </div>
      ) : (
        <>
          <ShareModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            movie={movie}
          />
          <MoviesInfo movie={movie} setModalOpen={setModalOpen} />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieCasts movie={movie} />
            {/* rate */}
            <MovieRates movie={movie}  />

            {/*  Related*/}
            {RelatedMovies && RelatedMovies.length > 0 && (
          <div className="my-16">
            <Titles title="Related Movies" Icon={BsCollectionFill} />
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm-grid-cols-2 gap-6">
              {RelatedMovies.map((movie) => (
                <Movie key={movie._id} movie={movie} />
              ))}
            </div>
          </div>
        )}
            
          </div>
        </>
      )}
    </Layout>
  );
}

export default SingleMovie;
