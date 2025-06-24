// src/components/SuggestedEventCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBookmark,
  FaArrowRightLong,
  FaBangladeshiTakaSign,
  FaRegClock,
} from "react-icons/fa6";

const SuggestedEventCard = ({ event, darkMode }) => (
  <Link to={`/eventdetailspublic/${event._id}`}>
    <motion.div
      className={`${
        darkMode ? "bg-dark-surface text-dark-primary" : "bg-white text-black"
      } rounded-md overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 h-full flex flex-col group`}
      data-aos="fade-up"
    >
      <div className="overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-56 object-cover rounded-t-md group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-xl font-bold flex-grow">{event.title}</h2>
        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-supporting font-semibold">
              {event.price}
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <GiTicket /> {event.totalTickets - event.soldTickets} Remaining
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <MdDateRange /> <span>{event.eventDate}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <FaRegClock /> <span>{event.duration}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </Link>
);

export default SuggestedEventCard;
