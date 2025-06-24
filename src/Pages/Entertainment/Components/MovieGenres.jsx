import React from "react";
import { FaFilm, FaStar, FaHeart, FaLaugh } from "react-icons/fa";

const genres = [
  {
    id: 1,
    name: "Action",
    description:
      "Fast-paced movies filled with adventure, explosions, and suspense.",
    icon: <FaFilm className="text-4xl text-white" />,
    bgColor: "bg-gradient-to-r from-red-600 to-yellow-500",
  },
  {
    id: 2,
    name: "Comedy",
    description: "Laugh out loud with hilarious films full of humor and wit.",
    icon: <FaLaugh className="text-4xl text-white" />,
    bgColor: "bg-gradient-to-r from-yellow-500 to-orange-400",
  },
  {
    id: 3,
    name: "Drama",
    description: "Emotional and intense stories that tug at your heartstrings.",
    icon: <FaHeart className="text-4xl text-white" />,
    bgColor: "bg-gradient-to-r from-pink-600 to-purple-600",
  },
  {
    id: 4,
    name: "Sci-Fi",
    description:
      "Explore futuristic worlds with mind-bending technology and otherworldly adventures.",
    icon: <FaStar className="text-4xl text-white" />,
    bgColor: "bg-gradient-to-r from-blue-500 to-teal-500",
  },
];

const MovieGenres = () => {
  return (
    <section className="bg-gray-900 text-white py-16 px-4 md:px-10">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
        🌟 Explore Movie Genres
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {genres.map((genre) => (
          <div
            key={genre.id}
            className={`p-8 rounded-xl text-center shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl ${genre.bgColor}`}
          >
            <div className="mb-6">{genre.icon}</div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              {genre.name}
            </h3>
            <p className="text-gray-300 text-sm md:text-base">
              {genre.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieGenres;
