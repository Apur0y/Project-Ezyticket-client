import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import useEntertainmentData from "../../Hooks/EntertainmentHook/useEntertainmentData";
import { CiBookmarkCheck } from "react-icons/ci";
import { motion } from "framer-motion";
import { IoPlayCircleSharp } from "react-icons/io5";
import { MdAccessTimeFilled, MdCategory } from "react-icons/md";

import { TbCategory } from "react-icons/tb";



// const slides = [
//   {
//     title: "Star Cineplex",
//     image: "/starcineplex.webp",
//   },

//   {
//     title: "Monihar Cineplex",
//     image: "/monihar.avif",
//   },

//   {
//     title: "",
//     image: "/cineplex2.jpg",
//   },
//   {
//     title: "UltraAVX",
//     image: "/cineplex3.jpg",
//   },
//   {
//     title: "IMAX",
//     image: "/cineplex4.jpg",
//   },
// ];

const MovieHeroSlider = () => {
  const { movies } = useEntertainmentData();
  console.log(movies);
  const newMovies = movies.slice(5, 10);
  return (
    <div className="relative text-white">


      <Swiper
        centeredSlides={true}
        slidesPerView={"auto"}
        spaceBetween={30}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {newMovies.map((slide, idx) => (
          <div className="relative">
            <SwiperSlide
              key={idx}
              className="!w-[80%] md:!w-[60%]  lg:!w-[80%] mx-auto transition-all duration-500 ease-in-out"
            >
              <div className="relative h-56 md:h-64 lg:h-[500px] overflow-hidden  shadow-lg">
                <img
                  src={slide.imageLink || `https://image.tmdb.org/t/p/w500${slide?.backdrop_path}`}
                  alt={`Slide ${idx + 1}`}
                  className="w-full h-full object-cover "
                />
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  mb-5   z-20 flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-12 max-w-4xl mx-auto">
                  <Link to="https://www.youtube.com/watch?v=u9Mv98Gr5pY&ab_channel=SonyPicturesEntertainment">
                    <button className="cursor-pointer hover:scale-110 transition-all duration-300 ">
                      <IoPlayCircleSharp className="size-12" />
                    </button>
                  </Link>

                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20 z-10" />

                {/* Content */}
              </div>

              <h1 className="text-2xl text-white-400 z-50  bg-main py-7 text-center md:text-right mb-8">
                {" "}
                {/* <h1 className="text-center">
                Now in Cinemas
                </h1> */}
             
                  <Link to={`/entertainment/allmovies/${slide._id || slide.id}`}>
                <button
                  onClick={() =>
                    document.getElementById("booksection")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="btn mr-3 shadow-none font-bold text-main bg-white hover:shadow-white hover:shadow-md"
                >
                  <CiBookmarkCheck className="size-5"/>
                  Book now
                </button>
                </Link>
              </h1>
              <div className=" absolute z-50 top-35 lg:top-60 md:ml-10 flex gap-5">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className=" "
                >
                  <img
                    src={slide.imageLink ||`https://image.tmdb.org/t/p/w500${slide?.poster_path}`}
                    alt={slide?.name}
                    className=" shadow-lg hidden lg:flex rounded-lg  lg:h-80"
                  />
                </motion.div>
                <div className="flex flex-col justify-center  gap-3">
                  <h2 className=" gap-5 text-3xl md:text-5xl  font-bold ">
                    {slide?.title || slide?.name}
                  </h2>
                  <p className=" hidden lg:flex"><TbCategory  className="my-auto mr-1"/>{slide.genre ||slide?.overview?.split(" ").slice(0,10).join(" ")} </p>
                  <p className=" flex"><MdAccessTimeFilled  className="my-auto mr-1"/>{slide?.release_date || slide.duration}</p>
                </div>
              </div>
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieHeroSlider;
