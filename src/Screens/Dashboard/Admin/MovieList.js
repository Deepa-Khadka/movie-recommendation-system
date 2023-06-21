import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Table from "../../../Component/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesAction } from "../../../Redux/Actions/MoviesAction";
import { toast } from "react-hot-toast";
import Loader from "../../../Component/Notification/Loader";
import { Empty } from "../../../Component/Notification/Empty";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";

function MoviesList() {
  const dispatch = useDispatch();
  const sameClass =
    "text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain mr-2";
  const { isLoading, isError, movies, pages, page } = useSelector(
    (state) => state.getAllMovies
  );
  useEffect(() => {
    dispatch(
      getAllMoviesAction({
        if(isError) {
          toast.error(isError);
        },
      })
    );
  }, [dispatch, isError]);
  //pagination  next and prev pages
  const nextpage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page + 1,
      })
    );
  };
  const prevpage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page - 1,
      })
    );
  };
  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold"> Movies List</h2>
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">
            Delete All
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : movies.length > 0 ? (
          <>
            <Table data={movies} admin={true} />
            <div className="w-full flex-rows gap-0 md:my-20 my-10">
              <button
                onClick={prevpage}
                disabled={page === 1}
                className={sameClass}
              >
                <TbPlayerTrackPrevFilled className="text-xl" />
              </button>

              <button
                onClick={nextpage}
                disabled={page === pages}
                className={sameClass}
              >
                <TbPlayerTrackNextFilled className="text-xl" />
              </button>
            </div>
          </>
        ) : (
          <Empty message="You have no  movies" />
        )}
      </div>
    </Sidebar>
  );
}

export default MoviesList;
