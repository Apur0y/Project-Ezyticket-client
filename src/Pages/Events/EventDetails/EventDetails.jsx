/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loading from "../../../Shared/Loading/Loading";
import noImage from "../../../assets/Common_image/noImage.png";
import { BsFillCalendar2DateFill } from "react-icons/bs";

// Icons
import {
  FaBookmark,
  FaArrowRightLong,
  FaBangladeshiTakaSign,
  FaRegClock,
} from "react-icons/fa6";
import { IoPersonCircle, IoLocation } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import {
  IoMdPricetags,
  IoIosTime,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { GiTicket } from "react-icons/gi";
import { FaMapMarkerAlt, FaMoneyCheckAlt } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const EventDetails = () => {
  // Hooks and state
  const { user, darkMode, userInfo } = useAuth();
  const { eventId } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });
  const [isSaved, setIsSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState();
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [checkout, setCheckout] = useState(false);
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of the animation
      easing: "ease-in-out", // Easing function for the animation
      once: true, // Ensures the animation occurs only once
    });
  }, []);

  // Data fetching
  const {
    data: eventData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["event", eventId],
    queryFn: async () => {
      const res = await axiosPublic.get(`/events/${eventId}`);
      return res.data;
    },
  });

  const { data: suggestionsData, isLoading: isSuggestionsLoading } = useQuery({
    queryKey: ["suggestions", eventData?.location],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/events?location=${eventData?.location}`
      );
      return res.data;
    },
    enabled: !!eventData?.location,
  });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosPublic.get(`/event-reviews?eventId=${eventId}`);
        setComments(res.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (eventId) {
      fetchComments();
    }
  }, [eventId, axiosPublic]); // Added axiosPublic to dependencies

  // Effects
  useEffect(() => {
    if (!eventData?.eventDate) return;

    const updateTimer = () => {
      const now = new Date();
      const difference = new Date(eventData.eventDate) - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [eventData?.eventDate]);

  useEffect(() => {
    const checkIfSaved = async () => {
      if (!user?.email || !eventData?._id) return;
      try {
        const res = await axiosPublic.get(`/wishlist/${user.email}`);
        setIsSaved(res.data.some((item) => item.eventId === eventData._id));
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    checkIfSaved();
  }, [user?.email, axiosPublic, eventData?._id]);

  // Handlers
  const handleSaveEvent = async () => {
    if (!user?.email) {
      Swal.fire("Error", "You must be logged in to save events!", "error");
      return;
    }

    try {
      if (isSaved) {
        await axiosPublic.delete(`/wishlist/${user.email}/${eventData?._id}`);
        Swal.fire("Removed", "Event removed from wishlist!", "info");
      } else {
        await axiosPublic.post("/wishlist", {
          eventId: eventData?._id,
          title: eventData?.title,
          eventDate: eventData?.eventDate,
          location: eventData?.location,
          price: eventData?.price,
          photo: eventData?.photo,
          userEmail: user.email,
          userName: user.displayName,
        });
        Swal.fire("Success!", "Event saved to wishlist!", "success");
      }
      setIsSaved(!isSaved);
      queryClient.invalidateQueries(["wishlist", user?.email]);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      Swal.fire("Error", "Something went wrong. Try again!", "error");
    }
  };
  useEffect(() => {
    requestAnimationFrame(() => {
      document.body.style.transition = "none"; // Remove any transition applied globally
    });
  }, []);
  //Handle Checkout
  const handleCheckout = async () => {
    const checkoutData = {
      name: userInfo?.name,
      email: userInfo?.email,
      phone: userInfo?.phone,
      address: userInfo?.address,
      price: parseFloat((eventData?.price * ticketQuantity * 1.05).toFixed(2)),
      product: eventData?.title,
      unitPrice: eventData?.price,
      charge: parseFloat((eventData?.price * ticketQuantity * 0.05).toFixed(2)),
      productCategory: eventData?.category,
      eventId: eventData?._id,
      quantity: ticketQuantity,
      status: "pending",
      paymentMethod: "card",
      date: new Date().toISOString(),
    };

    const res = await axiosSecure.post("/order", checkoutData);
    if (res.data) {
      window.location.replace(res.data.url);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) {
      Swal.fire("Error", "Please enter a comment.", "error");
      return;
    }

    try {
      const localTime = new Date().toLocaleString(); // Get local time as a readable string

      // Use userInfo if necessary
      const customerName = user?.displayName || userInfo?.name;
      const customerPhoto = user?.photoURL || userInfo?.photoURL;

      // Ensure customerName and customerPhoto are correctly set
      await axiosPublic.post("/event-reviews", {
        eventId: eventData._id,
        eventName: eventData.title,
        comment: comment,
        customerEmail: user?.email,
        customerName: customerName,
        customerPhoto: customerPhoto,
        time: localTime,
        category: "event",
        status: "pending",
      });

      Swal.fire(
        "Success",
        "Your comment has been submitted for review.",
        "success"
      );
      setComment("");
      setIsModalOpen(false);
      // Refresh comments after adding new one
      const res = await axiosPublic.get(`/event-reviews?eventId=${eventId}`);
      setComments(res.data);
    } catch (error) {
      console.error("Error adding comment:", error);
      Swal.fire("Error", "Something went wrong. Try again!", "error");
    }
  };
  // Helper components
  const DateDisplay = () => {
    const EventDate = eventData?.eventDate?.split("T")[0];
    const month = EventDate
      ? new Date(eventData?.eventDate).toLocaleString("default", {
          month: "long",
        })
      : "";
    const day = EventDate ? new Date(eventData?.eventDate).getDate() : "";

    return (
      <div
        className={`flex flex-col items-center text-center overflow-hidden rounded-md shadow-md border ${
          darkMode ? "border-gray-600" : "border-gray-100"
        }`}
      >
        <div
          className={`text-xl font-semibold ${
            darkMode
              ? "bg-dark-supporting text-dark-primary"
              : "bg-supporting text-white"
          } w-full py-0.5 flex items-center justify-center`}
        >
          {month}
        </div>
        <div
          className={`text-4xl font-semibold ${
            darkMode ? "bg-dark-surface" : "bg-white"
          } py-2 px-6 flex items-center justify-center`}
        >
          {day}
        </div>
      </div>
    );
  };

  const CountdownTimer = () => (
    <div className="flex justify-center gap-4 md:gap-2 text-white">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className={`flex flex-col items-center ${
            darkMode
              ? "bg-green-800 text-dark-primary"
              : "bg-green-600 text-white"
          } py-1 lg:py-2 px-3 lg:px-5 font-semibold rounded`}
        >
          <span className="text-3xl md:text-3xl font-bold">
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-sm uppercase tracking-wider">{unit}</span>
        </div>
      ))}
    </div>
  );

  const TicketCounter = () => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setTicketQuantity((prev) => Math.max(1, prev - 1))}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold 
            ${
              ticketQuantity <= 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-supporting text-white hover:bg-supporting-dark"
            }`}
          disabled={ticketQuantity <= 1}
        >
          -
        </button>
        <span className="text-2xl font-bold">{ticketQuantity}</span>
        <button
          onClick={() => setTicketQuantity((prev) => Math.min(4, prev + 1))}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold 
            ${
              ticketQuantity >= 4
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-supporting text-white hover:bg-supporting-dark"
            }`}
          disabled={ticketQuantity >= 4}
        >
          +
        </button>
      </div>
      <p className="text-gray-500">Max 4 tickets per user</p>
    </div>
  );

  const CommentModal = () => (
    <div className="fixed inset-0 bg-black/60 bg-opacity-75 flex items-center justify-center z-50">
      <div
        className={`${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        } p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 max-w-2xl`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Your Comment</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <IoMdCloseCircleOutline className="text-2xl" />
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium mb-2">
            Your thoughts about this event
          </label>
          <h2 className="text-xl font-bold mb-4">Add Comment</h2>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            className="w-full p-2 border rounded-md mb-4 text-left" // Added text-left here
            placeholder="Write your comment here..."
            autoFocus
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsModalOpen(false)}
            className={`px-4 py-2 rounded-lg font-medium ${
              darkMode
                ? "bg-gray-600 hover:bg-gray-500"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors`}
          >
            Cancel
          </button>
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-supporting text-white rounded-lg font-medium hover:bg-supporting-dark transition-colors"
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );

  const SuggestedEventCard = ({ event }) => (
    <Link to={`/eventdetailspublic/${event._id}`}>
      <motion.div
        className={`${
          darkMode ? "bg-dark-surface text-dark-primary" : "bg-white text-black"
        } rounded-md overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 h-full flex flex-col group`}
      >
        <div className="overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-56 object-cover rounded-t-md group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h2 className="text-xl font-bold flex-grow">{event.title}</h2>
          <div className="mt-auto pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-supporting font-semibold">
                <FaBangladeshiTakaSign /> {event.price}
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <GiTicket /> {event.totalTickets - event.soldTickets} Remaining
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <MdDateRange /> <span>{event.eventDate}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <FaRegClock /> <span>{event.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );

  // Loading and error states
  if (isLoading || isSuggestionsLoading) return <Loading />;
  if (error) return <p className="text-red-500 text-center">{error.message}</p>;

  return (
    <div
      className={`py-24 ${
        darkMode ? "bg-dark-background text-dark-primary" : "bg-background"
      }`}
    >
      <div className="mx-auto w-11/12">
        {/* Event Header */}
        <div className="flex items-start gap-4">
          <DateDisplay />
          <div className="flex flex-col">
            <p className={`font-bold text-2xl md:text-4xl mb-4`}>
              {eventData?.title}
            </p>
            <div className="flex flex-wrap gap-4 text-sm md:text-base mt-auto">
              <p className="text-gray-500 flex items-center gap-1">
                <MdDateRange className="text-xl" /> {eventData?.eventDate}
              </p>
              <p className="text-gray-500 flex items-center gap-1">
                <IoIosTime className="text-xl" /> {eventData?.duration}
              </p>
              <p className="text-gray-500 flex items-center gap-1">
                <IoLocation className="text-xl" /> {eventData?.location}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          {/* Left Section */}
          <div className="lg:col-span-2">
            <img
              src={eventData?.image || noImage}
              alt={eventData?.name}
              className="w-full h-[400px] md:h-[450px] lg:h-[500px] object-cover rounded-lg shadow-md"
            />

            <div className="flex gap-4 mt-10 flex-col md:flex-row md:ml-65">
              <button
                onClick={handleSaveEvent}
                className={`flex flex-row btn ${
                  isSaved
                    ? "bg-green-500 text-white"
                    : "hover:bg-green-400 hover:text-white"
                } w-full sm:w-auto`}
              >
                <FaBookmark /> {isSaved ? "Saved" : "Save"}
              </button>

              {/* Add to Google Calendar Button */}
              <a
                href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${
                  eventData?.title
                }&dates=${eventData?.eventDate}T${eventData?.eventTime.replace(
                  ":",
                  ""
                )}00Z/${eventData?.eventDate}T${eventData?.eventTime.replace(
                  ":",
                  ""
                )}30Z&details=${eventData?.details}&location=${
                  eventData?.location
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-2 ezy-button-primary-sm text-white rounded-lg font-medium w-full sm:w-auto"
              >
                <BsFillCalendar2DateFill className="mr-2" />
                Add to Calendar
              </a>
            </div>

            <div
              className={`${
                darkMode
                  ? "bg-dark-surface text-dark-primary"
                  : "bg-white text-black"
              } mt-4 p-6 md:p-10 rounded-lg shadow`}
            >
              <h2 className="text-xl md:text-2xl font-bold text-black">
                {eventData?.name}
              </h2>
              <p className="mt-2 text-md md:text-xl">{eventData?.details}</p>
            </div>

            {/* Comment section */}
            <div
              className={`${
                darkMode
                  ? "bg-dark-surface text-dark-primary"
                  : "bg-white text-black"
              } mt-4 p-6 md:p-10 rounded-lg shadow`}
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="font-bold text-2xl">Comments</h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    darkMode
                      ? "ezy-button-secondary-sm "
                      : "ezy-button-secondary-sm "
                  }`}
                >
                  Add Comment
                </button>
              </div>

              {comments?.length > 0 ? (
                <div className="space-y-4">
                  {comments
                    .filter((comment) => comment.eventId === eventData._id)
                    .map((comment, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg ${
                          darkMode ? "bg-gray-800" : "bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={comment.customerPhoto || noImage}
                            alt={comment.customerName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <p className="font-semibold">
                                {comment.customerName || "Anonymous"}
                              </p>
                              <p className="text-sm text-gray-500">
                                {new Date(comment.time).toLocaleString()}
                              </p>
                            </div>
                            <p className="mt-1">{comment.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="rounded-lg h-fit lg:col-span-1">
            {/* -----------------Event Details----------------- */}
            <div
              className={`${
                darkMode
                  ? "bg-dark-surface text-dark-primary"
                  : "bg-white text-black"
              } p-2 md:p-4 shadow-md`}
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-4">
                Event Details
              </h3>
              <div className="divider">Starts in</div>
              <div className="rounded-lg text-center">
                <CountdownTimer />
              </div>

              <div className="space-y-6 pt-4">
                <div className="text-base md:text-lg flex items-center text-gray-500 gap-2 mt-4">
                  <IoPersonCircle className="text-main text-lg md:text-xl" />
                  Organized by:{" "}
                  <span className="text-lg md:text-xl text-gray-600 font-semibold">
                    {eventData?.organizer}
                  </span>
                </div>

                <div className="text-base md:text-lg flex items-center text-gray-500 gap-2 mt-4">
                  <BsFillCalendar2DateFill className="text-main text-lg md:text-xl" />
                  Date & Time:{" "}
                  <span className="text-lg md:text-xl text-gray-600 font-semibold">
                    {eventData?.eventDate} {eventData?.eventTime}
                  </span>
                </div>

                <div className="text-base md:text-lg flex items-center text-gray-500 gap-2 mt-4">
                  <FaMapMarkerAlt className="text-main text-lg md:text-xl" />
                  Location:{" "}
                  <span className="text-lg md:text-xl text-gray-600 font-semibold">
                    {eventData?.location}
                  </span>
                </div>

                <div className="text-base md:text-lg flex items-center text-gray-500 gap-2 mt-4">
                  <FaMoneyCheckAlt className="text-main text-lg md:text-xl" />
                  Price:{" "}
                  <span className="text-lg md:text-xl text-gray-600 font-semibold">
                    Tk {eventData?.price}
                  </span>{" "}
                  /per person
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-4 mt-6 mx-auto">
                <button
                  onClick={() => setCheckout(true)}
                  className="w-full ezy-button-primary py-3 rounded-lg font-bold flex items-center justify-center gap-2"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* -------------------Billing Information--------------- */}
            <div
              className={`relative mt-8 ${checkout ? "block" : "hidden"} ${
                darkMode
                  ? "bg-dark-surface text-dark-primary"
                  : "bg-white text-black"
              } p-6 rounded-lg shadow-lg`}
            >
              {/* X Button to close the checkout panel */}
              <button
                onClick={() => setCheckout(false)}
                className="absolute top-1 right-1 text-2xl md:text-3xl hover:scale-110 text-red-400 font-bold hover:text-red-500 focus:outline-none rounded-full cursor-pointer transition-all duration-300"
                aria-label="Close"
              >
                <IoMdCloseCircleOutline />
              </button>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaBangladeshiTakaSign className="text-supporting" />
                Billing Information
              </h3>

              <div className="space-y-4">
                {/* User Information */}
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

                {/* Event Information */}
                <div
                  className={`p-4 rounded-lg ${
                    darkMode ? "bg-dark-background" : "bg-gray-50"
                  }`}
                >
                  <h4 className="text-lg font-semibold mb-3 text-supporting">
                    Event Details
                  </h4>
                  <div className="flex gap-4">
                    <img
                      src={eventData?.image || noImage}
                      alt={eventData?.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h5 className="font-bold text-lg">{eventData?.title}</h5>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm">
                        <p className="flex items-center gap-1">
                          <MdDateRange className="text-supporting" />
                          {eventData?.eventDate}
                        </p>
                        <p className="flex items-center gap-1">
                          <IoIosTime className="text-supporting" />
                          {eventData?.duration}
                        </p>
                        <p className="flex items-center gap-1">
                          <IoLocation className="text-supporting" />
                          {eventData?.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ticket Quantity */}
                <div
                  className={`p-4 rounded-lg ${
                    darkMode ? "bg-dark-background" : "bg-gray-50"
                  }`}
                >
                  <h4 className="text-lg font-semibold mb-3 text-supporting">
                    Ticket Quantity
                  </h4>
                  <TicketCounter />
                </div>

                {/* Payment Summary */}
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
                        Ticket Price ({ticketQuantity} × Tk {eventData?.price})
                      </span>
                      <span className="font-medium">
                        Tk {(eventData?.price * ticketQuantity).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Fee (5%)</span>
                      <span className="font-medium">
                        Tk{" "}
                        {(eventData?.price * ticketQuantity * 0.05).toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-supporting">
                        Tk{" "}
                        {(eventData?.price * ticketQuantity * 1.05).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
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
                        !userInfo?.address
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
                      Proceed to Checkout ({ticketQuantity}{" "}
                      {ticketQuantity > 1 ? "Tickets" : "Ticket"})
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
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && <CommentModal />}
        {/* Right Sidebar */}
        {/* More Events */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-start border-l-4 border-supporting pl-2 rounded mb-6">
            Related Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestionsData?.slice(0, 4).map((event, index) => (
              <div
                data-aos="fade-up" // Apply fade-up animation
                data-aos-delay={`${index * 200}`} // Optional delay for staggering effect
                key={event._id}
              >
                <SuggestedEventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
