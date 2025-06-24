import React, { useEffect, useState } from "react"; 
import { Link, useParams } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { motion } from "framer-motion";

import Swal from "sweetalert2";
import useEntertainmentData from "../../../Hooks/EntertainmentHook/useEntertainmentData";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const TicketBooking = () => {
  const { id } = useParams();
  const [selectedTime, setSelectedTime] = useState(null);
  const { userInfo, darkMode } = useAuth();
  const { movies, halls } = useEntertainmentData();
  const axiosSecure = useAxiosSecure();

  const timeSlots = ["11:00 AM", "01:30 PM", "5:30 PM", "8:00 PM"];




  // const cinemaHalls = movies.filter((m) => m._id == id)[0]?.cinemaHalls;

  const movie = movies.filter((movie) => movie._id == id)[0];

  const [formData, setFormData] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    phone: userInfo?.phone || "",
    cineplex: "",
    date: "",
    time: "",
    seats: 1,
    priceperticket: 0,
    address: userInfo?.address || "",
    movieName: movie?.name || "",
    // totalPrice: (formData?.priceperticket * Number(formData?.seats) * 1.05)
  });

  useEffect(() => {
    getNextNDays(7);
    const selectedHall = halls.filter((h) => h.name == formData.cineplex)[0];
    console.log(selectedHall?.price);

    if (selectedHall) {
      setFormData((prevData) => ({
        ...prevData,
        priceperticket: selectedHall.price,
      }));
    }
  }, [formData.cineplex, halls]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setFormData((prevData) => ({
      ...prevData,
      time,
    }));
  };

  const handleCheckout = async () => {
    const checkoutData = {
      name: userInfo?.name,
      email: userInfo?.email,
      phone: userInfo?.phone,
      address: userInfo?.address,
      price: parseFloat(
        (formData?.priceperticket * Number(formData.seats) * 1.05).toFixed(2)
      ),
      product: formData?.movieName,
      unitPrice: formData?.priceperticket,
      charge: parseFloat(
        (formData?.priceperticket * Number(formData.seats) * 0.05).toFixed(2)
      ),
      productCategory: movie?.category,
      eventId: movie?._id,
      quantity: Number(formData.seats),
      status: "pending",
      paymentMethod: "card",
      date: new Date().toISOString(),
    };
    // console.log(checkoutData);

    const res = await axiosSecure.post("/order", checkoutData);
    if (res.data) {
      window.location.replace(res.data.url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axiosSecure.post("/movie_tickets", formData).then(() => {
      Swal.fire({
        title: "Ticket Booked!",
        text: ` Booking Confirmed for ${movie.title}!`,
        icon: "success",
      });

      setFormData({
        date: "",
        time: "",
        seats: [],
      });
    });
  };

  const myDate = new Date;
  // console.log(myDate,"my date");

  const [selected, setSelected] = useState(new Date());
  const [days, setDays] = useState(["Today", "Tomorrow"]);
  const [calerndar, setCalendar] = useState(false);
  const [dayName, setDayName] = useState("Today");
  // console.log(dayName);

  function getNextNDays(n = 7) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    const nextDays = ["Today", "Tomorrow"];

    for (let i = 2; i < n; i++) {
      const nextDate = new Date();
      nextDate.setDate(today.getDate() + i);

      const dayName = days[nextDate.getDay()];
      // If you want to include formatted date, uncomment:
      const formattedDate = nextDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });

      nextDays.push(`${dayName}`);
    }
    setDays(nextDays);
    // console.log(nextDays);
  }

  return (
    <div id="booksection">
       <div>
        {days.length > 0 && (
          <div className="mt-4 flex gap-3">
            <div className="flex gap-2 flex-wrap ">
              {days.map((day, index) => (
                <div
                  onClick={() => setDayName(day)}
                  key={index}
                  className={`px-3 py-1 text-sm rounded-full cursor-pointer transition-all duration-300 ${
                    dayName === day
                      ? "bg-green-700 text-white"
                      : "bg-blue-100 text-green-800 hover:bg-green-700 hover:text-white"
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
            <button
              onClick={() => setCalendar(!calerndar)}
              className="px-3 cursor-pointer transition-all duration-600 hover:bg-green-700 bg-main text-white rounded-full text-sm"
            >
              Choose Date
            </button>
          </div>
        )}
      </div>



      <div className="pb-6 flex flex-col md:flex-row justify-around">
        {/* Selection Zone */}

        <div className="md:w-1/2  flex justify-center items-center px-4">
          <div
            className={`${
              darkMode
                ? "text-white bg-gray-500/20 backdrop-blur-3xl"
                : "bg-green-300/20 backdrop-blur-3xl"
            }  p-6 rounded-lg shadow-lg w-11/12 md:w-2xl pb-8 mx-auto mt-10`}
          >
            <h1 className="text-2xl font-bold  text-center mb-6">
              🎬 Pick Your One
            </h1>

        
            {/* Pick Time Slot */}
            <div className="mb-6">
              <h2 className="text-xl font-semiboldmb-4 flex items-center gap-2">
                ⏰ Pick a Showtime
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {timeSlots.map((time, index) => (
                  <motion.button
                    key={index}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-2xl border transition-all duration-300 font-medium text-sm shadow-sm ${
                      selectedTime === time
                        ? "bg-purple-600 text-white shadow-md ring-2 ring-purple-400"
                        : "bg-white text-gray-800 hover:bg-gray-100 border-gray-300"
                    }`}
                    onClick={() => handleTimeSelection(time)}
                  >
                    🎬 {time}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-2">
        {/* <label className="text-lg font-semibold text-gray-700">
          Select Cineplex
        </label> */}
        <select
          name="cineplex"
          value={formData.cineplex}
          onChange={handleChange}
          className="w-full p-3 rounded-xl text-center bg-green-100 text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
          required
        >
          <option disabled>Select Cineplex</option>
          {halls?.map((hall) => (
            <option key={hall.id || hall.name} value={hall.name}>
              {hall.name}
            </option>
          ))}
        </select>
      </div>

            <div>
              <label className="block text-sm ml-1 mt-2  mb-1">
                Number of Seats
              </label>
              <select
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Booking form */}
        <section>
          <div
            className={`${
              darkMode
                ? "text-white bg-gray-500/20 backdrop-blur-3xl"
                : "bg-green-300/20 backdrop-blur-3xl"
            }  p-6 rounded-lg shadow-lg   pb-8 mx-auto mt-10`}
          >
            <h2 className="text-2xl font-bold text-center mb-4">
              🎟 Book Your Ticket
            </h2>

            <p className="text-center  mb-4">
              Movie: <span className=" font-semibold">{movie?.name}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div
                className={`p-4 rounded-lg overflow-scroll ${
                  darkMode ? "bg-dark-background" : "bg-gray-50"
                }`}
              >
                <h4 className="text-lg font-semibold mb-3 text-supporting">
                  Your Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">
                      {userInfo?.name || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">
                      {userInfo?.email || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">
                      {userInfo?.phone || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">
                      {userInfo?.address || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="mt-2 text-supporting">
                  * If you want to edit information go to{" "}
                  <a href="/dashboard/profile">
                    <span className="text-green-600 font-medium underline cursor-pointer">
                      Profile page
                    </span>
                  </a>
                </div>
              </div>

              <div>
                <label className="block text-sm ml-1 mt-2  mb-1">
                  Price per Ticket
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.priceperticket}
                  placeholder="Ticket Price"
                  className="w-full p-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  required
                  disabled
                />
              </div>

              <div
                className={`p-4 rounded-lg ${
                  darkMode ? "bg-dark-background" : "bg-gray-50"
                }`}
              >
                <h4 className="text-lg font-semibold mb-3 text-supporting">
                  Order Summary
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>
                      Ticket Price ({formData.seats} × Tk{" "}
                      {formData.priceperticket})
                    </span>
                    <span className="font-medium">
                      Tk{" "}
                      {(
                        formData.priceperticket * Number(formData.seats)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee (5%)</span>
                    <span className="font-medium">
                      Tk{" "}
                      {(
                        formData.priceperticket *
                        Number(formData.seats) *
                        0.05
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-supporting">
                      Tk{" "}
                      {(
                        formData.priceperticket *
                        Number(formData.seats) *
                        1.05
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link className="block mt-6">
                <div className="relative group">
                  {" "}
                  {/* Tooltip container */}
                  <button
                    onClick={handleCheckout}
                    disabled={
                      !userInfo?.name ||
                      !userInfo?.email ||
                      !userInfo?.phone ||
                      !userInfo?.address ||
                      !formData?.priceperticket ||
                      !formData?.time ||
                      !formData?.date 

                    }
                    className={`w-full ezy-button-primary py-3 rounded-lg font-bold flex items-center justify-center gap-2 ${
                      !userInfo?.name ||
                      !userInfo?.email ||
                      !userInfo?.phone ||
                      !userInfo?.address
                        ? "opacity-50 !cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <FaBangladeshiTakaSign />
                    Proceed to Checkout
                  </button>
                  {/* Tooltip that appears when disabled */}
                  {(!userInfo?.name ||
                    !userInfo?.email ||
                    !userInfo?.phone ||
                    !userInfo?.address) && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2  bg-gray-800 text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      Please update your full information to checkout
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-0 border-t-4 border-gray-800"></div>
                    </div>
                  )}
                </div>
              </Link>

              <p className="text-center text-sm text-gray-500 mt-2">
                Secure payment processing powered by Stripe
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TicketBooking;
