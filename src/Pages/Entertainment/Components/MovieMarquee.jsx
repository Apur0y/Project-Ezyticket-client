import React from "react";
import useAuth from "../../../Hooks/useAuth";

const marqueeMovies = [
  {
    id: 1,
    title: "Avengers: Endgame",
    image:
      "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_FMjpg_UX1000_.jpg",
    description:
      "The Avengers work to reverse the damage caused by Thanos in Avengers: Infinity War.",
  },
  {
    id: 2,
    title: "Inception",
    image:
      "https://static1.srcdn.com/wordpress/wp-content/uploads/2019/12/Inception.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5",
    description:
      "A thief who enters the dreams of others to steal secrets from their subconscious is given the task of planting an idea into the mind of a CEO.",
  },
  {
    id: 3,
    title: "The Dark Knight",
    image:
      "https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_FMjpg_UX1000_.jpg",
    description:
      "Batman faces the Joker, a criminal mastermind who seeks to create chaos in Gotham City.",
  },
  {
    id: 4,
    title: "Titanic",
    image:
      "https://play-lh.googleusercontent.com/7SYIHW3ymjuNe3EFC5htYqOSW1-w8DjM93ftyLi_LlzeNEVlY0HAp4YOT6crIbmYcfJwFZBT8AUBSK2go1C3",
    description:
      "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious..",
  },
  {
    id: 5,
    title: "Interstellar",
    image:
      "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_.jpg",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
];

const MovieMarquee = () => {
  const { darkMode } = useAuth();

  return (
    <section className="py-16 px-4 text-white">
      <h2
        className={`text-3xl md:text-4xl font-extrabold text-center mb-12 ${
          darkMode ? "text-white" : "text-black "
        }  `}
      >
        <span></span> Movie Marquee Showcase
      </h2>

      <div className="relative overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 space-x-8 animate-marquee">
          {marqueeMovies.map((movie) => (
            <div
              key={movie.id}
              className="relative group rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-64 h-96 object-cover transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black backdrop-blur-2xl p-4 text-center text-white opacity-0 group-hover:opacity-80  transition-all duration-400 ">
                <h3 className="text-2xl font-bold text-[#ff014f]">
                  {movie.title}
                </h3>
                <p className="mt-2 text-sm">{movie.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieMarquee;
