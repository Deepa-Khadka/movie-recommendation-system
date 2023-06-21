import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import Titles from "./../Titles";
import { BsBookmarkStarFill, BsCaretLeft, BsCaretRight } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Rating from "../Stars";
import Loader from "../Notification/Loader";
import { Empty } from "../Notification/Empty";

const SwiperTop = forwardRef(({ movies }, ref) => {
  const swiperRef = useRef(null);

  useImperativeHandle(ref, () => ({
    slideNext: () => {
      swiperRef.current?.swiper?.slideNext();
    },
    slidePrev: () => {
      swiperRef.current?.swiper?.slidePrev();
    },
  }));

  return (
    <Swiper
      ref={swiperRef}
      slidesPerView={4}
      spaceBetween={40}
      autoplay={true}
      speed={500}
      loop={true}
      modules={[Navigation, Autoplay]}
    >
      {movies.map((movie, index) => (
        <SwiperSlide key={index}>
          <div className="p-4 h-rate hovered border border-border bg-dry rounded-lg overflow-hidden">
            <img
              src={
                movie?.titleImage
                  ? `/images/movies/${movie.titleImage}`
                  : "/images/user.png"
              }
              alt={movie.name}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="px-4  hoveres  gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0">
              <button className="w-12 h-12 flex-colo transition hover:bg-subMain rounded-full bg-white bg-opacity-30 text text-white">
                <FaHeart />
              </button>
              <Link
                className="font-semibold text-xl trancuted line-clamp-2"
                to={`/movie/${movie?._id}`}
              >
                {movie?.name}
              </Link>
              <div className="flex gap-2 text-star">
                <Rating value={movie?.rate} />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
});

function TopRated({ movies, isLoading }) {
  const swiperRef = useRef(null);

  const handleSlideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleSlidePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };



  return (
    <div className="my-16">
      <Titles title="Top Rated" Icon={BsBookmarkStarFill} />
      <div className="mt-10">
        {isLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <SwiperTop movies={movies} ref={swiperRef} />
        ) : (
          <Empty message="It seems like we don't have any movies." />
        )}
      </div>
      <div className="w-full px-1 flex-rows gap-6 pt-12">
        <button
          className="hover:bg-dry transition text-sm rounded w-8 h-8 flex-colo bg-subMain text-white"
          onClick={handleSlidePrev}
        >
          <BsCaretLeft />
        </button>
        <button
          className="hover:bg-dry transition text-sm rounded w-8 h-8 flex-colo bg-subMain text-white"
          onClick={handleSlideNext}
        >
          <BsCaretRight />
        </button>
      </div>
    </div>
  );
}

export default TopRated;
