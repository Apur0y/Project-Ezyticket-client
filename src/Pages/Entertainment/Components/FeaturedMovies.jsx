import React from "react";

const featuredMovies = [
  {
    id: 1,
    title: "Avengers: Endgame",
    image: "https://i.ytimg.com/vi/U3D2vmWD88w/maxresdefault.jpg",
    description: "The epic conclusion to the Marvel Cinematic Universe saga.",
    link: "#",
  },
  {
    id: 2,
    title: "Inception",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/29/Inception_2010_Film_Poster.jpg",
    description: "A mind-bending thriller by Christopher Nolan.",
    link: "#",
  },
  {
    id: 3,
    title: "The Dark Knight",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/83/Dark_Knight.jpg",
    description: "The legendary Batman film directed by Christopher Nolan.",
    link: "#",
  },
  {
    id: 4,
    title: "Interstellar",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a6/Interstellar_film_poster.jpg",
    description: "An intergalactic journey exploring love and time.",
    link: "#",
  },
];

const FeaturedMovies = () => {
  return (
    <section className="bg-gray-900 text-white py-16 px-4 md:px-10">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
        🎬 Featured Movies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {featuredMovies.map((movie) => (
          <div
            key={movie.id}
            className="group relative rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-center items-center">
              <div className="text-center">
                <h3 className="text-2xl font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-300 mt-2 mb-4">
                  {movie.description}
                </p>
                <a
                  href={movie.link}
                  className="bg-purple-600 text-white px-6 py-2 rounded-full text-lg font-semibold transition duration-300 hover:bg-purple-700"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedMovies;
