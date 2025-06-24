import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import Heading from "../../../components/Heading";
import useAuth from "../../../Hooks/useAuth";
import bus from "../../../assets/Home_image/bus.webp";
import dance from "../../../assets/Home_image/dance.webp";
import movie from "../../../assets/Home_image/movie.webp";

const HomeCategory = () => {
  const { darkMode } = useAuth();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 30,
      }
    }
  };

  // Category data
  const categories = [
    {
      title: "Plan Your Travel",
      description: "Book bus tickets quickly and easily.",
      image: bus,
      path: "/travel",
      lightBg: "bg-[#677115]",
      darkBg: "bg-[#37430b]",
      imageClass: "rounded-t-[150px]"
    },
    {
      title: "Explore Events",
      description: "Browse and book tickets for exciting events.",
      image: dance,
      path: "/events",
      lightBg: "bg-[#D2B483]",
      darkBg: "bg-[#817351]",
      imageClass: "rounded-tl-[120px] lg:rounded-tl-[150px] rounded-br-[120px] lg:rounded-br-[150px]"
    },
    {
      title: "Enjoy Movies",
      description: "Get your movie tickets in a minute.",
      image: movie,
      path: "/entertainment",
      lightBg: "bg-[#C68D6E]",
      darkBg: "bg-[#6B4C3A]",
      imageClass: "rounded-[80px] lg:rounded-[150px]"
    }
  ];

  return (
    <div className="w-11/12 mx-auto mb-8 md:mb-16 lg:mb-20 pt-72 md:pt-28">
      <section className="text-center">
        <Heading
          subtitle="EzyTicket"
          title="Book Tickets Easily with EzyTicket"
          extend="Anytime, Anywhere"
        />
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className={`p-6 shadow-md px-12 font-light rounded-md ${
                darkMode 
                  ? `${category.darkBg} text-dark-primary` 
                  : `${category.lightBg} text-white`
              }`}
              variants={item}
            >
              <div>
                <h3 className="uppercase text-2xl lg:text-3xl mb-2">
                  {category.title}
                </h3>
                <p>{category.description}</p>
              </div>
              
              <figure className={`overflow-hidden h-[300px] md:h-[220px] lg:h-[400px] my-8 ${category.imageClass}`}>
                <img
                  src={category.image}
                  alt={category.title}
                  className="rounded-b-none w-full h-full object-cover hover:scale-110 transition-all transform duration-300"
                />
              </figure>
              
              <div className="mt-4">
                <Link to={category.path}>
                  <button className="uppercase cursor-pointer flex items-center gap-1 mx-auto">
                    Learn More <FaArrowRightLong />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default HomeCategory;