/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { motion } from "framer-motion";
import { FaBus, FaCheckSquare } from "react-icons/fa";
import Heading from "../../../components/Heading";
import useAuth from "../../../Hooks/useAuth";
import { IoStar } from "react-icons/io5";
import { MdCast, MdDirectionsBike, MdLocalMovies } from "react-icons/md";
import TicketBooking from "./TicketBooking";
import useEntertainmentData from "../../../Hooks/EntertainmentHook/useEntertainmentData";
import Recommended from "./Recommended/Recommended";
import { Selection } from "./Selection/Selection";
import { useQuery } from "@tanstack/react-query";

const MovieDetailsPage = () => {
  // const [isavailable,seIsAvailablr]=useState('A4');
  const { darkMode } = useAuth();
  const { id } = useParams();

  const { movies } = useEntertainmentData();
  console.log(movies.find((m) => m.id == id));
  const movie = movies.find((movie) => movie.id ==id|| movie._id == id);
  console.log(movie);

  const { data: movieInfo } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=7c6a26f876561b33041c71bf76c78528`
      );
      return res.json();
    },
  });
  const { data: castInfo } = useQuery({
    queryKey: ["castInfo", id],
    queryFn: async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=7c6a26f876561b33041c71bf76c78528`
      );
      return res.json();
    },
  });
  const hour = parseInt(movieInfo?.runtime / 60);
  const min = parseInt(movieInfo?.runtime % 60);
  const actors = castInfo?.cast
    .map((actor) => actor.name)
    .slice(0, 3)
    .join(", ");
  const director =
    castInfo?.crew.find((crewMember) => crewMember.job === "Director")?.name ||
    "Unknown Director";

  // https://api.themoviedb.org/3/movie/1197306?api_key=7c6a26f876561b33041c71bf76c78528
  return (
    <div
      className={`pt-16 bg-gradient-to-br ${
        darkMode ? " text-white" : " text-black"
      }`}
    >
      <div className="relative h-56 md:h-64 lg:h-96    ">
        <img
          src={
            movie?.imageLink ||
            `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`
          }
          className="w-full h-full object-cover "
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            darkMode
              ? "  from-neutral-950/95  via-black/80   to-black/50"
              : " text-black from-white  /95  via-white/80   to-white/50"
          } `}
        />
        <div className="absolute -top-10 lg:top-44 ">
          <section>
            <div className="relative bg-cover  ">
              {/* <div className="absolute inset-0 bg-gradient-to-l from-neutral-800  md:neutral-800   to-black/95 "  /> */}

              <div className="relative container w-full  mx-auto py-16  px-6 flex flex-col md:flex-row md:items-center md:justify-center z-10">
                {/* Left Side - Image */}
                <div className="md:w-1/4 w-2/5 flex justify-end ">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className=" "
                  >
                    <img
                      src={
                        movie?.imageLink ||
                        `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                      }
                      alt={movie?.title}
                      className=" shadow-lg md:h-72  md:flex"
                    />
                    <button
                      onClick={() =>
                        document.getElementById("booksection")?.scrollIntoView({
                          behavior: "smooth",
                        })
                      }
                      className="btn  shadow-none mt-4 border-none w-full  bg-main text-white hover:shadow-md"
                    >

                     <span className="text-xs md:text-base">Book now</span> 
                    </button>
                  </motion.div>
                </div>

                {/* Middle Side - Content */}
                <div className="md:w-2/4 md:mx-5 ">
                  <div className="mt-12 text-base pl-8 ">
                    <h2 className=" gap-5 text-3xl md:text-5xl  font-bold ">
                      {movie?.title || movie?.name}
                    </h2>

                    <p className="mt-4   ">
                      {movie?.overview ||
                        movie?.description ||
                        "The amazing viewer experience got in the theatre. This is the movie of all time. Book now to experience the best of the best."}
                    </p>

                    {/* Benefits List */}
                    <ul className="mt-4   space-y-2">
                      <li className="flex items-center gap-2">
                        <MdDirectionsBike></MdDirectionsBike>Director :{" "}
                        {movie?.director || director}
                      </li>

                      <li className="flex items-center gap-2">
                        <MdCast></MdCast> Casts : {movie?.actors || actors}
                      </li>
                      <li className="flex items-center gap-2">
                        <IoStar /> Rating :{" "}
                        {movie?.vote_average?.toFixed(1) || "--"}/10
                      </li>
                    </ul>
                    {/* <div className="flex mt-10">
                    <h1 className="my-auto mr-4">Showing On:</h1>
                    <div className="overflow-x-auto flex flex-col gap-2 md:flex-row">
                      {movie?.cinemaHalls?.map((cinemaHall, index) => (
                        <div
                          className="border-2 border-purple-800 hover:bg-purple-800 transition-all duration-300 rounded-lg  md:rounded-4xl py-2 px-3 mr-3"
                          key={index}
                        >
                          <p>{cinemaHall}</p>
                        </div>
                      ))}
                    </div>
                  </div> */}
                  </div>
                </div>

                {/* End COnatent */}
                <div className="w-1/4 absolute right-20 top-15 md:static md:inline-block ">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2  "
                  >
                    <div className="flex flex-col text-base gap-4 ">
                      <div>
                        <p>RUN TIME</p>
                        {movie?.duration || (
                          <p>
                            {hour}h {min}m
                          </p>
                        )}
                      </div>
                      <div>
                        <p>RELEASE DATE</p>
                        <p>{movie?.releaseDate || movie?.release_date}</p>
                      </div>
                      <div className="flex flex-col md:flex-row gap-3">
                        {movie?.genre ||
                          movieInfo?.genres.map((g) => (
                            <div className="border-2 px-2 ">{g.name}</div>
                          ))}
                      </div>

                      <div className="flex items-center justify-center md:justify-start gap-4">
                        {/* <Link to="https://www.youtube.com/watch?v=u9Mv98Gr5pY&ab_channel=SonyPicturesEntertainment">
                    <button className="btn shadow-none bg-transparent text-white hover:shadow-white hover:shadow-md">
                      Watch Trailer
                    </button>
                  </Link> */}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* <img src={movie.poster} alt="" /> */}

      <div className="mt-80 pt-30 md:pt-1">
        <h1 className="text-5xl font-extrabold text-center  mx-15 rounded-2xl">
          {" "}
          
        </h1>
      </div>

      <Selection></Selection>

      {/* <TicketBooking></TicketBooking> */}
      <Recommended></Recommended>
    </div>
  );
};

export default MovieDetailsPage;
