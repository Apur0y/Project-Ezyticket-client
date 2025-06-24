import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";

const events = [
  {
    id: 1,
    title: "Live Concert: The Night Beats",
    date: "March 30, 2025",
    location: "Dhaka Arena",
    image:
      "https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "Comedy Night with Salman",
    date: "April 3, 2025",
    location: "Banani Theater",
    image:
      "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    title: "Drama: The Final Act",
    date: "April 10, 2025",
    location: "Shilpakala Academy",
    image:
      "https://images.pexels.com/photos/358010/pexels-photo-358010.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const FeaturedEventsSection = () => {
  return (
    <div className="bg-gradient-to-br from-black via-blue-900 to-purple-900 text-white py-12 px-4 md:px-10">
      <h2 className="text-center text-3xl font-bold text-white mb-12">
        Featured Events
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition duration-300"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-5">
              <h3 className="text-2xl font-bold text-white mb-2">
                {event.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                <FaCalendarAlt /> {event.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
                <FaMapMarkerAlt /> {event.location}
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 transition-all font-semibold py-2 rounded-lg flex items-center justify-center gap-2">
                <FaTicketAlt /> Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedEventsSection;
