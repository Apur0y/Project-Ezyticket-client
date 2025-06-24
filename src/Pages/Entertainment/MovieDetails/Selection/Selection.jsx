import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import TicketBooking from "../TicketBooking";
import useEntertainmentData from "../../../../Hooks/EntertainmentHook/useEntertainmentData";
import { motion } from "framer-motion";
import useAuth from "../../../../Hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

export function Selection() {
  const { userInfo, darkMode } = useAuth();
  const { halls, movies } = useEntertainmentData();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [selectedTime, setSelectedTime] = useState(null);
  const [selected, setSelected] = useState(new Date());
  const [days, setDays] = useState([
    { label: "Today", date: new Date() },
    { label: "Tomorrow", date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) },
  ]);
  const [calerndar, setCalendar] = useState(false);
  const [dayName, setDayName] = useState("Today");

  const timeSlots = ["11:00 AM", "01:30 PM", "5:30 PM", "8:00 PM"];
  const movie = movies.find((movie) => movie._id == id || movie.id == id);
  console.log(movie);

  const [formData, setFormData] = useState({
    name: userInfo?.name || "user",
    email: userInfo?.email || "",
    phone: userInfo?.phone || "",
    cineplex: "",
    priceperticket: 0,
    address: userInfo?.address || "",
    movieName: movie?.original_title || movie?.name || movie?.title || "",

    // totalPrice: (formData?.priceperticket * Number(formData?.seats) * 1.05)
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDaySelect = (selectedDay) => {
   
    setDayName(selectedDay.label || selectedDay);
    setFormData((prev) => ({
      ...prev,
      day: selectedDay.label || selectedDay,
      date: selectedDay.date || selectedDay,
    }));
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setFormData((prevData) => ({
      ...prevData,
      time: time,
    }));
  };



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
    const nextDays = [
      {
        label: "Today",
        date: today.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
      {
        label: "Tomorrow",
        date: new Date(
          today.getTime() + 1 * 24 * 60 * 60 * 1000
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
    ];

    for (let i = 2; i < n; i++) {
      const nextDate = new Date();
      nextDate.setDate(today.getDate() + i);

      const dayName = days[nextDate.getDay()];
      // If you want to include formatted date, uncomment:
      const formattedDate = nextDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      nextDays.push({
        label: dayName,
        date: formattedDate,
      });
    }
    setDays(nextDays);
    console.log(nextDays);
  }

  const handleCheckout = async () => {
    console.log("checkoutData");
    const checkoutData = {
      ...formData,
      name: userInfo?.name,
      email: userInfo?.email,
      phone: userInfo?.phone,
      address: userInfo?.address,
      ticketType:"entertainment",
      price: parseFloat(
        (formData?.priceperticket * Number(formData.seats) * 1.05).toFixed(2)
      ),
      product: formData?.movieName,
      unitPrice: formData?.priceperticket,
      charge: parseFloat(
        (formData?.priceperticket * Number(formData.seats) * 0.05).toFixed(2)
      ),
      productCategory: movie?.category,
      eventId: movie?._id || movie?.id,
      quantity: Number(formData.seats),
      status: "pending",
      paymentMethod: "card",
      date: new Date().toISOString(),
    };
    

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

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const seatsPerRow = 12;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const handleSelectSeat = (seat) => {
    setSelectedSeats((prev) => {
      const updatedSeats = prev.includes(seat)
        ? prev.filter((s) => s !== seat) // Remove seat if already selected
        : [...prev, seat]; // Add seat if not selected
  
      // Update form data using updatedSeats
      setFormData((prevData) => ({
        ...prevData,
        selectedSeats: updatedSeats,
        seats: updatedSeats.length,
      }));
  
      return updatedSeats; // Important: return the new selected seats
    });
  };
  
  return (
    <div className={`${darkMode? "bg-gradient-to-tr from-green-900 to-transparent text-black":" shadow-2xl text-black"} flex relative flex-col items-center gap-6 p-8 rounded-3xl  backdrop-blur-sm shadow-lg w-full mx-auto border border-gray-100`}>
  
    <div className="">
        <h1 className={`${darkMode?"text-white":"text-black"} text-3xl md:text-5xl  font-extrabold text-center  mx-15 rounded-2xl`}>
          {" "}
          Your Showtimes
        </h1>
      </div>
  {/* Days Selection */}
  <div className="w-full">
    {days.length > 0 && (
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium text-">Select Day</h3>
        <div className="flex flex-wrap gap-2">
          {days.map((day, index) => (
            <div
              onClick={() => handleDaySelect(day)}
              key={index}
              className={`px-4 py-2 text-sm rounded-xl cursor-pointer transition-all duration-300 font-medium ${
                dayName === (day.label || day)
                  ? "bg-gradient-to-r from-green-600 to-green-800 text- shadow-md"
                  : "bg-gray-100 text- hover:bg-gray-200"
              }`}
            >
              {day.label || day}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>

  {/* Calendar Popup */}
  <div
    className={`rounded-xl border absolute right-0 z-20  backdrop-blur-lg shadow-2xl border-gray-100 p-4 ${
      calerndar ? "transition-all duration-300" : "hidden"
    }`}
  >
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      styles={{
        caption: { color: "#008236", fontWeight: "600" },
        head_cell: { color: "#6b7280" },
        cell: { borderRadius: "8px", padding: "8px" },
        day_selected: {
          backgroundColor: "#3b82f6",
          color: "white",
          fontWeight: "bold",
        },
        day_today: {
          border: "1px solid #3b82f6",
        },
      }}
    />
  </div>

  {/* Cineplex Selection */}
  <div className="w-full md:w-2/3">
    <div className="relative">
      <select
        name="cineplex"
        value={formData.cineplex}
        onChange={handleChange}
        className="w-full p-4 rounded-xl  border border-gray-200 text- focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent appearance-none pr-10 shadow-sm"
        required
      >
        <option value="" disabled hidden>Select Cineplex</option>
        {halls?.map((hall) => (
          <option key={hall.id || hall.name} value={hall.name}>
            {hall.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="w-5 h-5 text-" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>

  {/* Time Slots */}
  <div className="w-full">
    <h3 className="text-lg font-medium text- mb-4">Available Showtimes</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {timeSlots.map((time, index) => (
        <motion.button
          key={index}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          className={`p-0 rounded-xl overflow-hidden transition-all duration-300 ${
            selectedTime === time ? "ring-2 ring-green-500 ring-offset-2" : ""
          }`}
          onClick={() => handleTimeSelection(time)}
        >
          <div
            className={`px-4 py-3 border ${
              selectedTime === time 
                ? "bg-gradient-to-br from-green-600 to-green-700 text-"
                : "border-gray-200 bg-white hover:bg-gray-50"
            } rounded-xl`}
          >
            <p className="text-lg font-medium">{time}</p>
            <p className={`text-xs ${
              selectedTime === time ? "text-green-100" : "text-"
            }`}>Standard Screen</p>
          </div>
        </motion.button>
      ))}
    </div>
  </div>

  {/* Seat Selection */}
  <div className="w-full flex flex-col md:flex-row gap-8 mt-4">
    {/* Seat Formation */}
    <div className="flex-1 flex flex-col items-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
      <div className="mb-6 text-center">
        <div className="text-xl font-bold text- mb-1">Screen</div>
        <div className="w-full h-3 bg-gradient-to-r from-transparent via-gray-400 to-transparent rounded-full opacity-30"></div>
      </div>

      <div className="grid gap-3 mb-8">
        {rows.map((row) => (
          <div key={row} className="flex justify-center gap-2">
            {Array.from({ length: seatsPerRow }, (_, index) => {
              const seat = `${row}${index + 1}`;
              const isSelected = selectedSeats.includes(seat);
              return (
                <button
                  key={seat}
                  onClick={() => handleSelectSeat(seat)}
                  className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg text-xs md:text-sm font-medium transition-all ${
                    isSelected 
                      ? "bg-green-600 text- shadow-md"
                      : "bg-gray-200 text- hover:bg-gray-300"
                  }`}
                >
                  {seat}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="w-full p-4 bg-white rounded-xl border border-gray-200">
        <h3 className="text-md font-semibold text- mb-2">Selected Seats</h3>
        <div className="min-h-8 p-2 bg-gray-100 rounded-lg text-">
          {selectedSeats.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seat) => (
                <span key={seat} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {seat}
                </span>
              ))}
            </div>
          ) : (
            <p className="text- italic">No seats selected</p>
          )}
        </div>
      </div>
    </div>

    {/* Booking Summary */}
    <div className="flex-1">
      <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl border border-green-100 shadow-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-800 flex items-center justify-center gap-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
          </svg>
          Book Your Ticket
        </h2>

        <p className="text-center text- mb-6">
          Movie: <span className="font-semibold text-">{movie?.name}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Info */}
          <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h4 className="text-lg font-semibold mb-4 text- flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Your Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Full Name", value: userInfo?.name, icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
                { label: "Email", value: userInfo?.email, icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                { label: "Phone", value: userInfo?.phone, icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
                { label: "Address", value: userInfo?.address, icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg text-green-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-">{item.label}</p>
                    <p className="font-medium text-">
                      {item.value || <span className="text-red-400">Not provided</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-">
              * To edit information, visit{" "}
              <a href="/dashboard/profile" className="text-green-600 font-medium hover:underline">
                Profile page
              </a>
            </div>
          </div>

          {/* Price Input */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <label className="block text-sm font-medium text- mb-2">Price per Ticket</label>
            <div className="relative">
              <input
                type="number"
                name="price"
                value={formData.priceperticket}
                placeholder="Ticket Price"
                className="w-full p-3 pl-10 rounded-lg bg-gray-50 border border-gray-200 text- focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                disabled
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-">৳</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h4 className="text-lg font-semibold mb-4 text- flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Order Summary
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-">Tickets ({formData.seats} × ৳ {formData.priceperticket})</span>
                <span className="font-medium text-">
                  ৳ {(formData.priceperticket * Number(formData.seats)).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-">Service Fee (5%)</span>
                <span className="font-medium text-">
                  ৳ {(formData.priceperticket * Number(formData.seats) * 0.05).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between pt-3 mt-2">
                <span className="text-lg font-bold text-">Total</span>
                <span className="text-xl font-bold text-green-700">
                  ৳ {(formData.priceperticket * Number(formData.seats) * 1.05).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="relative group">
            <button
              type="button"
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
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-800 text- hover:from-green-700 hover:to-green-900 transition-all shadow-md ${
                !userInfo?.name ||
                !userInfo?.email ||
                !userInfo?.phone ||
                !userInfo?.address
                  ? "opacity-50 cursor-not-allowed grayscale"
                  : "hover:shadow-lg"
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
              Proceed to Checkout
            </button>

            {/* Tooltip */}
            {(!userInfo?.name ||
              !userInfo?.email ||
              !userInfo?.phone ||
              !userInfo?.address) && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text- text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                Please update your profile information to checkout
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-b-0 border-gray-800"></div>
              </div>
            )}
          </div>

          <p className="text-center text-xs text- mt-3 flex items-center justify-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure payment processing powered by Stripe
          </p>
        </form>
      </div>
    </div>
  </div>
</div>
  );
}
