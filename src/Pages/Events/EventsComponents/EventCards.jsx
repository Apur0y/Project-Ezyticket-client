import { MdDateRange } from "react-icons/md";
import Loading from "../../../Shared/Loading/Loading";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaBangladeshiTakaSign, FaRegClock } from "react-icons/fa6";
import { GiTicket } from "react-icons/gi";

const EventCards = () => {
  const { darkMode } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    data: events = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["topEvents"],
    queryFn: async () => {
      const res = await axiosPublic.get("/topEvents");
      return res.data.sort(
        (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
      ); // Sorting after fetching
    },
  });

  if (isLoading)
    return (
      <p className="text-center text-lg mt-30">
        <Loading />
      </p>
    );

  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  
  return (
    <div
      className={` ${
        darkMode ? "bg-dark-background text-dark-primary" : "bg-background"
      }`}
      id="eventsCard"
    >
      <h1 className="text-5xl font-bold text-center text-main mb-3">
        Recent Events
      </h1>
      <p className="text-xl font-semibold text-center text-gray-500 mb-10">
        Buy Your Event Tickets Anytime, Anywhere – Hassle-Free & Instant
        Confirmation!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto w-11/12">
        {events.slice(0, 3).map((event) => (
          <div
            key={event._id}
            className={`${
              darkMode ? "bg-dark-surface text-white" : "bg-white text-black"
            } rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 h-full flex flex-col group`}
          >
            <Link to={`/eventdetailspublic/${event._id}`}>
              <div className="overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-56 object-cover rounded-t-xl group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-semibold text-gray-800 flex-grow">
                  {event.title}
                </h2>

                <div className="mt-auto pt-4">
                  {/* Price and Remaining Seat */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-main font-semibold">
                      <FaBangladeshiTakaSign className="text-xl" />
                      <span className="text-lg">{event.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <GiTicket className="text-xl" />
                      <span className="text-lg">
                        {event.totalTickets - event.soldTickets} Remaining
                      </span>
                    </div>
                  </div>

                  {/* Date and Duration */}
                  <div className="flex items-center justify-between text-gray-500 text-lg">
                    <div className="flex items-center gap-2">
                      <MdDateRange />
                      <span>{event.eventDate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaRegClock />
                      <span>{event.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCards;
