import React, { useState, useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";

// Fake review data with star ratings
const reviews = [
  {
    id: 1,
    organizer: "John Doe",
    review:
      "ezyTicket made organizing our event a breeze! The ticketing process was seamless, and the attendees had a smooth experience. Highly recommended!",
    stars: 5,
  },
  {
    id: 2,
    organizer: "Jane Smith",
    review:
      "Using ezyTicket for our online webinar was fantastic! The platform is user-friendly and the ticketing system is efficient. Great service!",
    stars: 4,
  },
  {
    id: 3,
    organizer: "Mark Williams",
    review:
      "The event ticketing was easy to set up, but the customer support could be better. Overall, a good experience.",
    stars: 3,
  },
  {
    id: 4,
    organizer: "Emily Davis",
    review:
      "Excellent service! ezyTicket helped us manage our large conference smoothly. I would definitely use them again.",
    stars: 5,
  },
  {
    id: 5,
    organizer: "Chris Johnson",
    review:
      "ezyTicket's interface is simple to navigate, but there were some minor issues with processing payments. Would still recommend.",
    stars: 4,
  },
];

const EventReview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { darkMode } = useAuth();
  // Function to go to the next review
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  // Auto-slide effect every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(handleNext, 3000); // Change review every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Generate the stars based on the review rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`text-${i < rating ? "yellow" : "gray"}-500`}>
        ★
      </span>
    ));
  };

  return (
    <div
      className={`${
        darkMode ? "text-dark-primary" : "text-black"
      }  px-4 py-12 
       text-center mt-10 `}
    >
      {/* Title */}
      <h1 className="text-3xl font-semibold ">
        What Users Are Saying About{" "}
        <span className="text-main">EzyTicket Events</span>
      </h1>

      {/* Carousel */}
      <div className="mt-12 relative max-w-4xl mx-auto">
        {/* Carousel Cards */}
        <div className={`${darkMode ? 'bg-dark-surface text-dark-primary' : 'bg-gradient-to-r from-main/70 to-main text-white'} p-6 rounded-2xl shadow-lg transform transition-all duration-500 ease-in-out`}>
          <h3 className="text-2xl font-semibold">
            {reviews[currentIndex].organizer}
          </h3>
          <p className="mt-4 text-base">
            {reviews[currentIndex].review}
          </p>
          <div className="mt-4 flex justify-center">
            {renderStars(reviews[currentIndex].stars)}
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="mt-4 flex justify-center space-x-2">
        {reviews.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition duration-300 ${
              currentIndex === index ? "bg-supporting" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default EventReview;
