import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useAxiosPublic from '../../../../../Hooks/useAxiosPublic';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure=useAxiosPublic();

  useEffect(() => {
    axiosSecure.get(`/allmovies/${id}`)
      .then(res => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load movie:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!movie) return <p className="text-center mt-10">Movie not found!</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6">Edit Movie</h1>
      <form className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            defaultValue={movie.name}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            defaultValue={movie.description}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium">Image Link</label>
          <input
            type="text"
            defaultValue={movie.imageLink}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium">Duration</label>
          <input
            type="text"
            defaultValue={movie.duration}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            defaultValue={movie.category}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium">Genre</label>
          <input
            type="text"
            defaultValue={movie.genre}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium">Actors</label>
          <input
            type="text"
            defaultValue={movie.actors}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium">Release Date</label>
          <input
            type="date"
            defaultValue={movie.releaseDate}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium">Language</label>
          <input
            type="text"
            defaultValue={movie.language}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium">Director</label>
          <input
            type="text"
            defaultValue={movie.director}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
        >
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default MovieDetails;
