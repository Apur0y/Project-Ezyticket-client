import React from "react";
import { FaArrowAltCircleRight, FaStar } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

import useEntertainmentData from "../../Hooks/EntertainmentHook/useEntertainmentData";
import MovieCard from "./Components/MovieCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination, Navigation } from "swiper/modules";

const TrendingMovies = () => {
  const { movies } = useEntertainmentData();
  // console.log(movies);

  return (
    <section className=" mt-24  w-10/12 mx-auto md:px-10">
      <div className="flex justify-between">
        <h2 className="text-3xl border-l-4 pl-3 text-main md:text-4xl font-bold ">
          Now Showing
        </h2>

        <Link to="allmovies">
          <button className="btn ezy-button-primary w-36 scale-80 md:scale-100">
            View All <FaArrowAltCircleRight></FaArrowAltCircleRight>{" "}
          </button>
        </Link>
      </div>

      <div className="">
        <div>
          <Swiper
            spaceBetween={30}
            freeMode={true}
            navigation={true}
            modules={[FreeMode, Navigation, Pagination]}
            breakpoints={{
              // when window width is >= 0px
              0: {
                slidesPerView: 3,
              },
              500: {
                slidesPerView: 3,
              },
              // when window width is >= 768px (medium screens)
              768: {
                slidesPerView: 4,
              },
              // when window width is >= 1024px (large screens)
              1024: {
                slidesPerView: 4,
              },

              1280: {
                slidesPerView: 5,
              },
            }}
            className="mySwiper text-white md:mt-5 "
          >
            {movies.map((movie) => (
              <SwiperSlide>
                <MovieCard movie={movie}></MovieCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TrendingMovies;
