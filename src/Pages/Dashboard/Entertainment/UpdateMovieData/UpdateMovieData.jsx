import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";

const UpdateMovieData = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const navigate = useNavigate(); // For navigation after the update
  const { darkMode } = useAuth(); // For dark mode
  const axiosSecure = useAxiosSecure(); // Secure axios instance
  const [movieData, setMovieData] = useState(null); // Store the movie data
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    category: "",
    genre: "",
    actors: "",
    releaseDate: "",
    language: "",
    director: "",
    imageLink: "",
    cinemaHalls: [],
  });

  // Fetch movie data when the page is loaded
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axiosSecure.get(
          `/allmovies/${id}` // Use the movie ID from the URL
        );
        const data = response.data;
        setMovieData(data);
        setFormData(data); // Set initial values to the form
      } catch (error) {
        console.error("Failed to fetch movie data:", error);
      }
    };

    fetchMovieData();
  }, [id, axiosSecure]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle cinema halls input
  const handleCinemaHallsChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      cinemaHalls: value.split(",").map((hall) => hall.trim()),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send updated data to the backend
      await axiosSecure.put(`/allmovies/${id}`, formData);
      Swal.fire("Updated!", "The movie details have been updated.", "success");
      navigate("/manage-movies"); // Navigate back after successful update
    } catch (error) {
      Swal.fire("Error", "Failed to update movie. Please try again.", "error");
      console.log(error);
    }
  };

  // If the movie data is still loading
  if (!movieData) {
    return <p>Loading movie details...</p>;
  }

  return (
    <div
      className={`min-h-screen p-6 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">
        🎬 Update Movie Data
      </h2>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
        {/* Movie Title */}
        <div>
          <label className="block font-semibold text-lg">Movie Title</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold text-lg">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block font-semibold text-lg">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold text-lg">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block font-semibold text-lg">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Actors */}
        <div>
          <label className="block font-semibold text-lg">Actors</label>
          <input
            type="text"
            name="actors"
            value={formData.actors}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Release Date */}
        <div>
          <label className="block font-semibold text-lg">Release Date</label>
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Language */}
        <div>
          <label className="block font-semibold text-lg">Language</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Director */}
        <div>
          <label className="block font-semibold text-lg">Director</label>
          <input
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Image Link */}
        <div>
          <label className="block font-semibold text-lg">Image Link</label>
          <input
            type="text"
            name="imageLink"
            value={formData.imageLink}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Cinema Halls */}
        <div>
          <label className="block font-semibold text-lg">Cinema Halls</label>
          <input
            type="text"
            name="cinemaHalls"
            value={formData.cinemaHalls.join(", ")}
            onChange={handleCinemaHallsChange}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Enter cinema halls, separated by commas"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMovieData;
