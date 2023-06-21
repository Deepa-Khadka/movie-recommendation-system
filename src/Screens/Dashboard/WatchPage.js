import React, { useEffect } from "react";
import Layout from "../../Layout/Layout";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaHeart, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../../Redux/Actions/MoviesAction";

function WatchPage() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const sameClass = "w-full gap-6 flex-colo min-h-screen";

  const [play, setPlay] = useState(false);

  //use Selector
  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );

  //use Effect
  useEffect(() => {
    //movie id
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      <div className="container mx-auto bg-dry p-6  mb-12">
        <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border-gray-800 p-6">
          <Link
            to={`/movie/${movie?._id}`}
            className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray"
          >
            <BiArrowBack /> {movie?.name}
          </Link>
          <div className="flex-btn sm:w-auto w-full gap-5">
            <button className="bg-subMain flex-rows gap-2 hover:text-main transitions  text-white rounded px-8 font-medium py-3 text-sm">
              <FaHeart />
            </button>
          </div>
        </div>
        {play ? (
          <video controls className="w-full h-screen rounded">
            <source
              src="/images/movie.mp4"
              type="video/mp4"
              title={movie?.name}
            />
          </video>
        ) : (
          <div className="w-full h-screen rounded-lg  overflow-hidden relative">
            <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex justify-center items-center">
              <button
                onClick={() => setPlay(true)}
                className="bg-white text-subMain flex-col border border-subMain rounded-full w-20 h-20 font-medium text-xl 
 flex justify-center items-center"
              >
                <FaPlay />
              </button>
            </div>
            <img src={movie?.image ? `/images/movies/${movie?.image}` : "/images/user.png"}
            alt={movie?.name} className='w-full '/>
          
          </div>
        )}
      </div>
    </Layout>
  );
}

export default WatchPage;
