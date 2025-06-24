import React from "react";
import useEntertainmentData from "../../../../Hooks/EntertainmentHook/useEntertainmentData";
import { Link } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import MovieCard from "../../Components/MovieCard";

const Recommended = () => {
  const { movies } = useEntertainmentData();
  const recMovies = movies.slice(4,10)

  return (
    <div className="mx-10 py-10">
      <div className="flex justify-between">
        <h2 className="text-3xl border-l-4 pl-3 mb-4 text-main md:text-4xl font-bold ">
          Recommended
        </h2>
      </div>
      <div>
        <Swiper
          spaceBetween={30}
          freeMode={true}
          navigation={true}
          modules={[FreeMode, Navigation, Pagination]}
          breakpoints={{
            // when window width is >= 0px
            0: {
              slidesPerView: 1,
            },
            624:{
                slidesPerView: 2,
            },  
            // when window width is >= 768px (medium screens)
            768: {
              slidesPerView: 3,
            },
            // when window width is >= 1024px (large screens)
            1024: {
              slidesPerView: 4,
            },

            1280: {
              slidesPerView: 5,
            },
          }}
          className="mySwiper text-white mt-10"
        >
          {recMovies.map((movie) => (
            <SwiperSlide>
              <MovieCard movie={movie}></MovieCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Recommended;
