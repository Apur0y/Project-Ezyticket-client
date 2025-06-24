import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import useAuth from "../../../../Hooks/useAuth";

const fakeTickets = [
  {
    id: 1,
    movieName: "Dune: Part Two",
    hall: "Star Cineplex Bashundhara",
    showTime: "3:00 PM",
    date: "2025-04-22",
    user: "john.doe@example.com",
    seat: "C4, C5",
    paymentStatus: "Paid",
  },
  {
    id: 2,
    movieName: "Godzilla x Kong: The New Empire",
    hall: "Blockbuster Cinemas Dhaka",
    showTime: "6:30 PM",
    date: "2025-04-23",
    user: "jane.smith@example.com",
    seat: "A1, A2",
    paymentStatus: "Pending",
  },
];

const TicketManager = () => {
  const [tickets, setTickets] = useState(fakeTickets);
  const { darkMode } = useAuth();

  const handleDelete = (id) => {
    const updated = tickets.filter((ticket) => ticket.id !== id);
    setTickets(updated);
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-8 transition duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Ticket Manager</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto shadow-lg rounded-xl overflow-hidden">
          <thead className={`${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <tr className="text-left text-sm md:text-base">
              <th className="p-3">Movie</th>
              <th className="p-3">Hall</th>
              <th className="p-3">Show Time</th>
              <th className="p-3">Date</th>
              <th className="p-3">User</th>
              <th className="p-3">Seats</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className={`${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-white hover:bg-gray-50"
                } border-b`}
              >
                <td className="p-3 font-semibold">{ticket.movieName}</td>
                <td className="p-3">{ticket.hall}</td>
                <td className="p-3">{ticket.showTime}</td>
                <td className="p-3">{ticket.date}</td>
                <td className="p-3">{ticket.user}</td>
                <td className="p-3">{ticket.seat}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      ticket.paymentStatus === "Paid"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {ticket.paymentStatus}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className="text-red-500 hover:text-red-700 transition text-lg"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
            {tickets.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center p-6 text-gray-400">
                  No tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketManager;
