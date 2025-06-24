import React from "react";
import { FaPlay } from "react-icons/fa";

const trailers = [
  {
    id: 1,
    title: "Avengers: Endgame",
    thumbnail:
      "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
    trailerUrl: "https://www.youtube.com/embed/TcMBFSGVi1c",
  },
  {
    id: 2,
    title: "Dune: Part Two",
    thumbnail:
      "https://thefulcrum.ca/wp-content/uploads/2021/11/arts_dune-still_cred_legendary-entertainment.jpg",
    trailerUrl: "https://www.youtube.com/embed/U2Qp5pL3ovA",
  },
  {
    id: 3,
    title: "Deadpool & Wolverine",
    thumbnail: "https://media.wdwnt.com/2024/07/GTLksTLWYAAiDD7.jpg",
    trailerUrl: "https://www.youtube.com/embed/73_1biulkYk",
  },
];

const FeaturedTrailers = () => {
  return (
    <section className="  mt-24 px-4 md:px-10">
         <h2 className="text-3xl mb-4 border-l-4 pl-3 text-supporting md:text-4xl font-bold ">
        Featured Trailers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {trailers.map((movie) => (
          <div
            key={movie.id}
            className="group relative rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={movie.thumbnail}
              alt={movie.title}
              className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <a
                href={movie.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-supporting px-5 py-3 rounded-full text-lg font-medium transition"
              >
                <FaPlay /> Watch Trailer
              </a>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3 text-center">
              <h3 className="text-xl text-white font-semibold">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedTrailers;
