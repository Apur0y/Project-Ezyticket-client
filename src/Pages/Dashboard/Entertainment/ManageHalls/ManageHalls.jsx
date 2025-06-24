import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";

const ManageHalls = () => {
  const { darkMode } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all halls
  const fetchHalls = async () => {
    const res = await axiosSecure.get("/cinemahalls");
    return res.data;
  };

  const {
    data: halls = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["halls"],
    queryFn: fetchHalls,
  });

  // Delete handler
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This hall will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/cinemahalls/${id}`);
          queryClient.invalidateQueries(["halls"]);
          Swal.fire("Deleted!", "The hall has been removed.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to delete hall.", "error");
        }
      }
    });
  };

  return (
    <div
      className={`min-h-screen p-6 transition duration-300 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">🏢 Manage Halls</h2>

      {isLoading ? (
        <p className="text-center font-medium">Loading halls...</p>
      ) : isError ? (
        <p className="text-center text-red-500">
          Failed to load halls: {error.message}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse shadow-xl rounded-xl overflow-hidden">
            <thead>
              <tr className={`${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Seats</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {halls.map((hall) => (
                <tr
                  key={hall._id}
                  className={`border-b ${
                    darkMode ? "hover:bg-gray-900" : "hover:bg-gray-100"
                  }`}
                >
                  <td className="px-4 py-3">
                    <img
                      src={hall.image}
                      alt={hall.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-3 font-semibold">{hall.name}</td>
                  <td className="px-4 py-3">{hall.location}</td>
                  <td className="px-4 py-3">{hall.totalSeats}</td>
                  <td className="px-4 py-3">{hall.email}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 transition"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 transition"
                      title="Delete"
                      onClick={() => handleDelete(hall._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {halls.length === 0 && (
            <p className="text-center py-6 text-gray-500">No halls found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageHalls;
