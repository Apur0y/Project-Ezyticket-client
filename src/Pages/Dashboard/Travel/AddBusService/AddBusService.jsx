import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AddBusService = () => {
  const { user, userInfo } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  
  const [formData, setFormData] = useState({
    busName: "",
    busTimes: "",
    date: "",
    from: "",
    to: "",
    refund: false,
    ticketPrice: "",
    tripName: "",
    type: "",
    userEmail: user?.email,
    userName: userInfo?.name,
  });

  const locations = [
    "Mohakhali Bus Terminal, Dhaka",
    "Kamalapur Bus Stand, Dhaka",
    "Sayedabad Bus Terminal, Dhaka",
    "Rajshahi Bus Terminal, Rajshahi",
    "Uttara Bus Stand, Dhaka",
    "Sylhet Bus Terminal, Sylhet",
    "Gabtoli Bus Terminal, Dhaka",
    "Chittagong Bus Stand, Chittagong",
  ];

  const busTypes = ["AC", "Non-AC"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Bus Service:", formData);

    axiosSecure.post("/busServices", { bus: formData }).then((res) => {
      Swal.fire({
        title: "Your Bus Service Has Been Added!",
        icon: "success",
        confirmButtonColor: "#10B981",
      });
      setFormData({
        busName: "",
        busTimes: "",
        date: "",
        from: "",
        to: "",
        refund: false,
        ticketPrice: "",
        tripName: "",
        type: "",
        userEmail: user?.email,
        userName: userInfo?.name,
      });
    });
  };

  return (
    <div className="w-full mx-auto my-6 p-8 bg-white rounded-lg">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
        Add New Bus Service
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="busName"
            placeholder="Bus Name (e.g., Shohagh Paribahan)"
            value={formData.busName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <input
            type="text"
            name="tripName"
            placeholder="Trip Name (e.g., Eid Trip)"
            value={formData.tripName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Bus Type</option>
            {busTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="ticketPrice"
            placeholder="Ticket Price"
            value={formData.ticketPrice}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <select
            name="from"
            value={formData.from}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Departure Location</option>
            {locations.map((location, idx) => (
              <option key={idx} value={location}>
                {location}
              </option>
            ))}
          </select>

          <select
            name="to"
            value={formData.to}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Destination Location</option>
            {locations.map((location, idx) => (
              <option key={idx} value={location}>
                {location}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <input
            type="time"
            name="busTimes"
            value={formData.busTimes}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="refund"
            checked={formData.refund}
            onChange={handleChange}
            className="checkbox checkbox-success"
          />
          <label className="text-gray-700 font-medium">Refundable Ticket</label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-100 p-4 rounded-lg">
          <input
            type="email"
            name="userEmail"
            placeholder="User Email"
            value={formData.userEmail}
            className="input input-bordered w-full"
            readOnly
          />
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            value={formData.userName}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn bg-green-600 hover:bg-green-700 text-white text-lg px-10"
          >
            Add Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBusService;
