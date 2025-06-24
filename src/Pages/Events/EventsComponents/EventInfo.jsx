import React from "react";
import {
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaUserFriends,
  FaRegHandshake,
} from "react-icons/fa";
import { IoMusicalNoteSharp } from "react-icons/io5";
import useAuth from "../../../Hooks/useAuth";
import Heading from "../../../components/Heading";

const EventInfo = () => {
  const { darkMode } = useAuth();

  const events = [
    {
      title: "Venue Events",
      description:
        "We organize in-person events that connect attendees, offering a memorable and engaging experience.",
      icon: <FaCalendarAlt className="text-4xl text-orange-500" />,
      backgroundImage:
        "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Online Webinars",
      description:
        "Host seamless virtual events with interactive features for a fully immersive experience.",
      icon: <FaChalkboardTeacher className="text-4xl text-pink-500" />,
      backgroundImage:
        "https://images.pexels.com/photos/3727459/pexels-photo-3727459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Networking Events",
      description:
        "Bring together professionals for valuable networking opportunities and idea sharing.",
      icon: <FaUserFriends className="text-4xl text-purple-500" />,
      backgroundImage:
        "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Workshops",
      description:
        "Create educational workshops that engage your audience and help them develop new skills.",
      icon: <FaChalkboardTeacher className="text-4xl text-blue-500" />,
      color: "text-blue-500",
      backgroundImage:
        "https://images.pexels.com/photos/716276/pexels-photo-716276.jpeg",
    },
    {
      title: "Conferences",
      description:
        "Organize large-scale conferences with a variety of speakers, workshops, and networking sessions.",
      icon: <FaRegHandshake className="text-4xl text-red-500" />,
      color: "text-orange-500",
      backgroundImage:
        "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
    },
    {
      title: "Concerts",
      description:
        "Organize large-scale concerts with a variety of bands, solo artists, and festivals.",
      icon: <IoMusicalNoteSharp className="text-4xl text-green-500" />,
      color: "text-green-600",
      backgroundImage:
        "https://images.pexels.com/photos/1763067/pexels-photo-1763067.jpeg",
    },
  ];

  return (
    <div className={`w-11/12 mx-auto text-center mb-8 md:mb-16 lg:mb-20`}>
      <Heading
      subtitle={"Explore Your Options"}
      title={"From Concerts to Conferences"}
      ></Heading>

      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event, index) => (
          <div
            key={index}
            className={`relative px-8 py-6 rounded-md shadow-md transform transition-all duration-300 hover:shadow-xl group overflow-hidden text-white cursor-pointer hover:scale-105 border ${
              darkMode && "border-gray-600"
            }`}
          >
            <div
              className="absolute inset-0 opacity-80 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500 bg-cover bg-center"
              style={{
                backgroundImage: `url(${event.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>

            <div className="relative flex flex-col items-center text-center ">
              <div className="mb-4">{event.icon}</div>
              <h3 className="text-2xl font-semibold ">{event.title}</h3>
              <p className="mt-3 text-base max-w-sm">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventInfo;
