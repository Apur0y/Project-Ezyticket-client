import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-black via-blue-900 to-purple-900">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_0_15px_#9333ea] tracking-wide">
        🎭 Explore Top Entertainment Events
      </h1>
      <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
        Discover concerts, drama shows, stand-up comedy nights and more. Book
        your seat now and enjoy an unforgettable experience.
      </p>
      <div className="mt-8">
        <a
          href="/events"
          className="inline-block px-8 py-3 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition duration-300"
        >
          🎟️ Book Tickets
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
