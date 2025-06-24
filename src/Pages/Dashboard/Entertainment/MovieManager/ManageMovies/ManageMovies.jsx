import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "../../../../../Hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageMovies = () => {
  const { darkMode } = useAuth(); // Get dark mode from context
  const axiosSecure = useAxiosSecure(); // Secure axios instance
  const queryClient = useQueryClient(); // React Query for refetching

  // Fetch all movies from the backend
  const fetchMovies = async () => {
    try {
      const res = await axiosSecure.get("/allmovies");
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch movies");
    }
  };

  // Use React Query to manage movies state
  const {
    data: movies = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  // Delete movie handler
  // ✅ SweetAlert Delete Handler
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/allmovies/${id}`);
          queryClient.invalidateQueries(["movies"]);

          Swal.fire("Deleted!", "The movie has been removed.", "success");
        } catch (error) {
          console.error("Delete failed:", error);
          Swal.fire("Error", "Failed to delete movie. Try again.", "error");
        }
      }
    });
  };
  // Edit movie handler (placeholder for modal or navigation)

  return (
    <div
      className={`min-h-screen p-6 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">🎬 Manage Movies</h2>

      {/* Show loading, error or table */}
      {isLoading ? (
        <p className="text-center text-lg font-medium">Loading movies...</p>
      ) : isError ? (
        <p className="text-center text-red-500 font-medium">
          Failed to load movies: {error.message}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse shadow-md rounded-xl overflow-hidden">
            <thead>
              <tr className={`${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
                <th className="px-4 py-3 text-left">Poster</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Genre</th>
                <th className="px-4 py-3 text-left">Release Date</th>
                <th className="px-4 py-3 text-left">Cinema Halls</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr
                  key={movie._id}
                  className={`border-b ${
                    darkMode ? "hover:bg-gray-900" : "hover:bg-gray-100"
                  }`}
                >
                  <td className="px-4 py-3">
                    <img
                      src={movie.imageLink}
                      alt={movie.name}
                      className="w-16 h-24 object-cover rounded-md shadow"
                    />
                  </td>
                  <td className="px-4 py-3 font-semibold">{movie.name}</td>
                  <td className="px-4 py-3">{movie.category}</td>
                  <td className="px-4 py-3">{movie.genre}</td>
                  <td className="px-4 py-3">{movie.releaseDate}</td>
                  <td className="px-4 py-3">{movie.cinemaHalls?.join(", ")}</td>
                  <td className="px-4 py-3 space-x-2">
                    {/* Edit Button */}
                    <Link to={`/dashboard/update-movie/${movie._id}`}>
                      <button
                        className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                    </Link>

                    {/* Delete Button */}
                    <button
                      className="text-red-500 hover:text-red-700 transition cursor-pointer"
                      title="Delete"
                      onClick={() => handleDelete(movie._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMovies;
