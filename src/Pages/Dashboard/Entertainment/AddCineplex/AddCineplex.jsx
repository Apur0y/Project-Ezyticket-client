import React, { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddCineplex = () => {
  const axiosPublic = useAxiosSecure();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    totalSeats: "",
    price: "",
    facilities: {
      ac: false,
      DDD: false,
      food: false,
      vip: false,
    },
    email: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    // type,

    if (name in formData.facilities) {
      setFormData({
        ...formData,
        facilities: {
          ...formData.facilities,
          [name]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Submitting cinema hall:", formData);
    axiosPublic.post("/cinemahalls", formData).then((res) => {
      console.log(res.data);
      Swal.fire({
        title: "Cinema Hall Added",
        text: "Go to cinemas",
        icon: "success",
      });
      setFormData({
        name: "",
        location: "",
        totalSeats: "",
        price: "",
        facilities: {
          ac: false,
          DDD: false,
          food: false,
          vip: false,
        },
        email: "",
        image: "",
      })
    });
  };
  return (
    <div className="md:max-h-screen"
   
    >
      <div className="relative h-[700px] md:h-[1100px] bg-cover bg-center"
      style={{ backgroundImage: "url('/addcine2.jpg')" }}
      >

        {/* <img src="/addcine2.jpg" alt="" className="w-full min-h-auto object-cover" /> */}
        <div className="absolute inset-0 bg-black/40 bg-opacity-50"></div>

        <div className="max-w-3xl min-w-xs absolute top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white md:p-6  text-center mx-auto   shadow-2xl rounded-xl mt-10">
          <h1 className="text-4xl font-bold mb-6 text-center text-white">
            Register Your Cinema Hall
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Cinema Hall Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="number"
              name="totalSeats"
              placeholder="Total Number of Seats"
              value={formData.totalSeats}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="number"
              name="price"
              placeholder="Price of a Seat"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />

            <div className="flex flex-wrap gap-4 border-2 p-3 rounded-lg border-neutral-500">
              <label className="text-xl text-neutral-500 ">Facilities : </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="ac" onChange={handleChange} />
                AC
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="DDD" onChange={handleChange} />
                3D Screen
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="food" onChange={handleChange} />
                Food Court
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="vip" onChange={handleChange} />
                VIP Seating
              </label>
            </div>

            <input
              type="email"
              name="email"
              placeholder="Contact Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="text"
              name="image"
              placeholder="Image Link Here"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white p-3 rounded-lg font-medium"
            >
              Register Cinema Hall
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCineplex;
