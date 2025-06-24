import { FaQuoteRight } from "react-icons/fa";
import BusImage from "../../../assets/Travel_image/luxury.jpg"
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y,  Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useState } from "react";


const testimonials = [
    {
        id: 1,
        name: "Arman Kahn",
        role: "University Student",
        rating: 5,
        content:
            "EzyTicket saved me so much time! I booked a bus from Sylhet to Dhaka right before my finals — no stress, just a comfy ride.",
        image: "https://i.ibb.co.com/G4yDhqLg/man-7.jpg",
        accentColor: "bg-purple-500"
    },
    {
        id: 2,
        name: "Arif Chowdhury",
        role: "Freelance Photographer",
        rating: 4,
        content:
            "Was on a tight schedule for a client shoot in Cox's Bazar. EzyTicket helped me get there early and comfortably. Great platform for travelers!",
        image: "https://i.ibb.co.com/CKGcCQRb/man-6.jpg",
        accentColor: "bg-indigo-500"
    },
    {
        id: 3,
        name: "Rifat Sorkar",
        role: "Travel Blogger",
        rating: 5,
        content:
            "Exploring Bangladesh was easier with EzyTicket. Booked my train from Rajshahi to Khulna in minutes. Love how smooth the process was!",
        image: "https://i.ibb.co.com/1GY99B8b/man-4.jpg",
        accentColor: "bg-pink-500"
    }
];

const TravelTestimonials=()=> {
    const { darkMode } = useAuth();
    const [activeIndex, setActiveIndex] = useState(0); // Track current index
    const currentTestimonial = testimonials[activeIndex]; //Get current testimonial

    return (
        <section className={`bg-gradient-to-r my-20 from-supporting-50 to-supporting py-20 ${darkMode ? "text-white" : "text-black"}`}>
            <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center px-8">
                {/* Left Side */}
                <div className="flex flex-col items-start">
                    <p className="text-sm uppercase text-main font-semibold mb-2 ">Testimonials</p>
                    <h2 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
                        What Our Clients <span className="text-main">Say About Us</span>
                    </h2>

                    {/*  Dynamically loaded name & role */}
                    <div className="flex items-center gap-4 mt-6">
                        <img
                            src={currentTestimonial.image}
                            alt="Client"
                            className="w-16 h-16 rounded-full object-cover border-4 border-main"
                        />
                        <div>
                            <p className="text-lg font-semibold ">{currentTestimonial.name}</p>
                            <p className="text-sm text-gray-500">{currentTestimonial.role}</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Swiper Carousel */}
                <div className="">
                    <Swiper
                        modules={[Navigation, Pagination, A11y, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        onSlideChange={(swiper) =>
                            setActiveIndex(swiper.realIndex) //  Track actual slide
                        }
                        className="w-[350px] flex justify-center md:w-full  mx-auto"
                    >
                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <motion.div
                                    whileHover={{ y: -6 }}
                                    className={`px-6 py-16 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full relative overflow-hidden group ${darkMode ? "bg-dark-surface" : "bg-white"
                                        }`}
                                >
                                    {/* Decorative accent circle */}
                                    <div
                                        className={`absolute -top-16 -left-16 h-40 w-40 ${testimonial.accentColor} rounded-full opacity-10 transition-all duration-500 ease-in-out z-0 group-hover:scale-[12] group-hover:opacity-10 group-hover:-top-full group-hover:-left-full`}
                                        style={{ transformOrigin: "top left" }}
                                    ></div>

                                    {/* Content */}
                                    <div className="z-10 relative">
                                        <div className="flex items-center mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={`${i < testimonial.rating
                                                            ? "text-yellow-400"
                                                            : "text-gray-300"
                                                        } text-lg`}
                                                />
                                            ))}
                                        </div>
                                        <FaQuoteLeft className="text-gray-300 text-3xl mb-4" />
                                        <p
                                            className={`mb-6 flex-grow text-lg leading-relaxed ${darkMode ? "text-dark-primary" : "text-gray-600"
                                                }`}
                                        >
                                            {testimonial.content}
                                        </p>
                                       
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>)
}

export default TravelTestimonials;
