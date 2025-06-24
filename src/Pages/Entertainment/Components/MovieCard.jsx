import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { FaImdb, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosInformationCircleOutline, IoMdPlay } from "react-icons/io";
import { MdBookmarkBorder } from "react-icons/md";

const MovieCard = ({ movie }) => {
  const { darkMode } = useAuth();

  return (
    <div
      key={movie.id}
      className={`h-80 w-40 md:w-48 mt-15 relative group flex flex-col scale-90 justify-between  md:min-w-0 ${
        darkMode ? " " : " text-black"
      } rounded-t-xl transition hover:-translate-y-1 duration-300`}
    >
    <div>
        {/* Background Image with Overlay */}
        <div className="relative overflow-hidden rounded-t-xl">
          <Link to={`/entertainment/allmovies/${movie.id || movie._id}`}>
            <img
              src={
                movie.imageLink ||
                `https://image.tmdb.org/t/p/w500${movie.poster_path}` ||
                "/moviedefault.jpg"
              }
              alt={movie.name}
              className="h-full w-full object-cover rounded-lg  shadow-lg transition duration-300 group-hover:brightness-50"
            />
          </Link>

          <a
            href="https://youtu.be/zTbgNC42Ops?si=UZzzgh_qAGiaSfcC"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-0 p-3 text-white bg-green-700 hover:bg-green-400 transition duration-300"
          >
            <IoMdPlay className="size-8" />
          </a>

          <Link to={`/entertainment/allmovies/${movie.id || movie._id}`}>
            <div className="absolute  top-0 right-0 p-2 pt-4 text-white hover:scale-110 transition duration-300 ">
              <MdBookmarkBorder className="size-7" />
            </div>
          </Link>

          {/* Movie Title and Genre */}
          <div className="p-4 bg-transparent">
            <h3 className="text-xl font-semibold mb-1">
              {movie.name || movie.title}
            </h3>
            <p className="text-sm mb-2">{movie.genre}</p>
          </div>
        </div>

        {/* Book Now Button Always Visible */}
        </div>
    </div>
  );
};

export default MovieCard;
