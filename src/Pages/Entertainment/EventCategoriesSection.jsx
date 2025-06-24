import React from "react";
import { FaMusic, FaTheaterMasks, FaLaugh } from "react-icons/fa";

const categories = [
  {
    id: 1,
    name: "Concerts",
    icon: <FaMusic className="text-4xl text-purple-600" />,
    description: "Live music performances from top artists.",
    bgColor: "bg-gradient-to-r from-purple-800 via-indigo-700 to-blue-800", // Darker purple-blue gradient
  },
  {
    id: 2,
    name: "Comedy Nights",
    icon: <FaLaugh className="text-4xl text-yellow-400" />,
    description: "Laugh out loud at stand-up comedy shows.",
    bgColor: "bg-gradient-to-r from-orange-700 via-red-600 to-yellow-700", // Darker orange-red gradient
  },
  {
    id: 3,
    name: "Drama Shows",
    icon: <FaTheaterMasks className="text-4xl text-red-600" />,
    description: "Engage in dramatic performances and plays.",
    bgColor: "bg-gradient-to-r from-red-800 via-orange-700 to-yellow-700", // Darker red-yellow gradient
  },
];

const EventCategoriesSection = () => {
  return (
    <div className="py-12 px-4 md:px-10 bg-black/80 text-white">
      <h2 className="text-center text-3xl font-bold text-white mb-12">
        Explore Event Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`p-6 rounded-2xl ${category.bgColor} text-center shadow-lg hover:scale-105 transition-all`}
          >
            <div className="mb-4">{category.icon}</div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              {category.name}
            </h3>
            <p className="text-gray-300">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCategoriesSection;
