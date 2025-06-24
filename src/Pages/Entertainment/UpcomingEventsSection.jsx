import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";

const upcomingEvents = [
  {
    id: 1,
    title: "Rock Festival 2025",
    date: "May 5, 2025",
    location: "Mirpur Stadium",
    image:
      "https://images.pexels.com/photos/236171/pexels-photo-236171.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "Jazz Night Under the Stars",
    date: "May 15, 2025",
    location: "Dhaka Jazz Lounge",
    image:
      "https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    title: "Outdoor Comedy Jam",
    date: "May 22, 2025",
    location: "Gulshan Park",
    image:
      "https://images.pexels.com/photos/207248/pexels-photo-207248.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const UpcomingEventsSection = () => {
  return (
    <div className="py-12 px-4 md:px-10 bg-gradient-to-br from-black via-blue-900 to-purple-900 text-white">
      {/* Section Title */}
      <h2 className="text-center text-3xl font-bold text-white mb-12">
        Upcoming Events
      </h2>

      {/* Event Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl text-center shadow-lg hover:scale-105 transition-all"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover mb-6 rounded-lg"
            />
            <h3 className="text-2xl font-semibold text-white mb-2">
              {event.title}
            </h3>
            <div className="flex items-center justify-center gap-2 text-gray-300 mb-3">
              <FaCalendarAlt /> {event.date}
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-300 mb-6">
              <FaMapMarkerAlt /> {event.location}
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center gap-2">
              <FaTicketAlt /> Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEventsSection;
