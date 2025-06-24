import { FaCheck, FaShippingFast, FaHeadset } from "react-icons/fa";
import busTicket from '../../../assets/Home_image/busTicket.webp';
import movieTicket from '../../../assets/Home_image/movieTicket.webp';
import concertTicket from '../../../assets/Home_image/concertTicket.webp';
import { motion, useAnimation } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const AboutUs = () => {
  const { darkMode } = useAuth();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  // Responsive animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const imageLeft = {
    hidden: { opacity: 0, x: -100, y: 0 },
    show: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      } 
    },
  };

  const imageRight = {
    hidden: { opacity: 0, x: 100, y: 0 },
    show: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      } 
    },
  };

  const centerImage = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const content = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    },
  };

  return (
    <motion.div
      ref={ref}
      className="my-16 grid md:grid-cols-2 gap-8 w-11/12 mx-auto px-4"
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {/* Left Column - Images */}
      <div className="relative flex items-center justify-center h-[300px] sm:h-[400px] md:h-[500px]">
        {/* Desktop Layout */}
        <div className="hidden md:block w-full h-full">
          {/* Bus Ticket - Top Left */}
          <motion.img
            variants={imageLeft}
            src={busTicket}
            alt="Bus Ticket"
            className="w-1/2 absolute top-0 left-0 rounded-xl shadow-lg border-4 border-white z-0"
          />
          
          {/* Movie Ticket - Bottom Right */}
          <motion.img
            variants={imageRight}
            src={movieTicket}
            alt="Movie Ticket"
            className="w-1/2 absolute bottom-0 right-0 rounded-xl shadow-lg border-4 border-white z-0"
          />
          
          {/* Concert Ticket - Centered */}
          <motion.img
            variants={centerImage}
            src={concertTicket}
            alt="Concert Ticket"
            className="w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-lg border-4 border-white z-10"
          />
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden w-full h-full">
          {/* Bus Ticket - Bottom Left */}
          <motion.img
            variants={imageLeft}
            src={busTicket}
            alt="Bus Ticket"
            className="w-2/3 absolute bottom-0 left-0 rounded-xl shadow-lg border-4 border-white z-0"
          />
          
          {/* Movie Ticket - Top Right */}
          <motion.img
            variants={imageRight}
            src={movieTicket}
            alt="Movie Ticket"
            className="w-2/3 absolute top-0 right-0 rounded-xl shadow-lg border-4 border-white z-0"
          />
          
          {/* Concert Ticket - Centered */}
          <motion.img
            variants={centerImage}
            src={concertTicket}
            alt="Concert Ticket"
            className="w-2/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-lg border-4 border-white z-10"
          />
        </div>
      </div>

      {/* Right Column - Content */}
      <motion.div
        variants={content}
        className="flex flex-col justify-center mt-8 md:mt-0"
      >
        <p className={`uppercase text-lg sm:text-xl font-semibold mb-2 ${darkMode ? 'text-dark-supporting' : 'text-supporting'}`}>
          About EzyTicket
        </p>
        <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-dark-primary' : 'text-gray-800'}`}>
          One Platform for All Your Ticketing Needs
        </h3>

        <p className={`text-base sm:text-lg mb-6 ${darkMode ? 'text-dark-secondary' : 'text-gray-600'}`}>
          Whether it's hopping on a bus, catching the latest blockbuster, or attending the hottest concerts — EzyTicket brings convenience to your fingertips.
        </p>

        <ul className="space-y-3 sm:space-y-4 mb-8">
          <li className="flex items-start gap-3 sm:gap-4">
            <FaCheck className="text-green-500 mt-1 flex-shrink-0 text-lg" />
            <div>
              <h4 className={`font-semibold text-base sm:text-lg ${darkMode ? 'text-dark-primary' : 'text-gray-700'}`}>Simple & Fast Booking</h4>
              <p className={`text-sm sm:text-base ${darkMode ? 'text-dark-secondary' : 'text-gray-600'}`}>Book your tickets in seconds with a user-friendly interface.</p>
            </div>
          </li>
          <li className="flex items-start gap-3 sm:gap-4">
            <FaShippingFast className="text-blue-500 mt-1 flex-shrink-0 text-lg" />
            <div>
              <h4 className={`font-semibold text-base sm:text-lg ${darkMode ? 'text-dark-primary' : 'text-gray-700'}`}>Instant Confirmation</h4>
              <p className={`text-sm sm:text-base ${darkMode ? 'text-dark-secondary' : 'text-gray-600'}`}>Get real-time confirmation and never miss out on events.</p>
            </div>
          </li>
          <li className="flex items-start gap-3 sm:gap-4">
            <FaHeadset className="text-purple-500 mt-1 flex-shrink-0 text-lg" />
            <div>
              <h4 className={`font-semibold text-base sm:text-lg ${darkMode ? 'text-dark-primary' : 'text-gray-700'}`}>24/7 Customer Support</h4>
              <p className={`text-sm sm:text-base ${darkMode ? 'text-dark-secondary' : 'text-gray-600'}`}>We're always here to help with your ticketing queries.</p>
            </div>
          </li>
        </ul>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium ${darkMode ? 'bg-dark-accent hover:bg-dark-accent-dark' : 'bg-main hover:bg-main-dark'} text-white transition-colors`}>
            Explore Tickets
          </button>
          <button className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium border ${darkMode ? 'border-dark-primary text-dark-primary hover:bg-dark-surface' : 'border-gray-700 text-gray-700 hover:bg-gray-50'} transition-colors`}>
            Learn More
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutUs;