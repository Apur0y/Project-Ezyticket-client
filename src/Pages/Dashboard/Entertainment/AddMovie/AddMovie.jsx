import React, { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useEntertainmentData from "../../../../Hooks/EntertainmentHook/useEntertainmentData";


const AddMovie = () => {
  const axiosSecure = useAxiosSecure();
  const [movieData, setMovieData] = useState({
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

const {halls}=useEntertainmentData();


const hallNames = halls.map(hall => hall.name); 
// console.log(hallNames);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Movie Data Submitted:", movieData);
    axiosSecure.post('/allmovies',movieData)

    .then((res)=>{
      console.log(res.data)
      Swal.fire({
              title: "Movie Added Successfully",
              text: "Go to cinemas",
              icon: "success",
            });
            setMovieData({
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
            })
    })
  };

  return (
    <div className="relative h-[900px] md:h-[1100px] bg-cover bg-center"
    style={{ backgroundImage: "url('/addcine2.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40 bg-opacity-50"></div>

      <div className=" absolute top-0  mx-auto p-6 text-white shadow-md rounded-lg ">
        <h2 className="text-4xl font-bold mb-6  text-white">
          Add New Movie
        </h2>
        <div className="flex gap-5">
          <form onSubmit={handleSubmit} className="space-y-4 w-2/3">
            <input
              name="name"
              value={movieData.name}
              placeholder="Name"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-amber-50"
              required
            />
            <textarea
              name="description"
              value={movieData.description}
              placeholder="Description"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              name="duration"
              value={movieData.duration}
              placeholder="Duration (e.g., 2h 15m)"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              name="category"
              value={movieData.category}
              placeholder="Category (e.g., Action, Drama)"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              name="genre"
              value={movieData.genre}
              placeholder="Genre (e.g., Thriller, Romance)"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              name="actors"
              value={movieData.actors}
              placeholder="Actors (comma separated)"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="date"
              name="releaseDate"
              value={movieData.releaseDate}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              name="language"
              value={movieData.language}
              placeholder="Language (e.g., English, Hindi)"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              name="director"
              value={movieData.director}
              placeholder="Director"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              name="imageLink"
              value={movieData.imageLink}
              placeholder="Image Link (URL)"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />

            <button type="submit" className="p-3 rounded-lg w-full bg-green-700 mt-4">
              Add Movie
            </button>
          </form>

          <div className="w-1/3">
            <label className="block mb-2 font-medium">
              Select Cinema Halls
            </label>
            <div className="border rounded-lg p-4 space-y-2">
              {hallNames.map((hall, idx) => (
                <label key={idx} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="cinemaHalls"
                    value={hall}
                    checked={movieData.cinemaHalls.includes(hall)}
                    onChange={(e) => {
                        const { checked, value } = e.target;
                        setMovieData((prev) => ({
                          ...prev,
                          cinemaHalls: checked
                            ? [...prev.cinemaHalls, value]
                            : prev.cinemaHalls.filter((h) => h !== value),
                        }));
                      }}
                    className="checkbox bg-main text-main"
                  />
                  <span className="text-sm">{hall}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
