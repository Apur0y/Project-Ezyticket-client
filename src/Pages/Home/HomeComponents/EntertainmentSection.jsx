import { FaPlane, FaTag, FaMapMarkerAlt, FaRegSmile, FaBus } from "react-icons/fa";
import { Link } from "react-router-dom";
import dhaka from "../../../assets/Home_image/dhaka.webp";
import merinDrive from "../../../assets/Home_image/marinDrive.webp";
import sylhet from "../../../assets/Home_image/sylhet.webp";
import chittagong from "../../../assets/Home_image/chittagong.jpg";
import cineplex1 from "../../../assets/Home_image/cineplex1.webp";
import cineplex2 from "../../../assets/Home_image/cineplex2.webp";
import cineplex3 from "../../../assets/Home_image/cineplex3.webp";
import cineplex4 from "../../../assets/Home_image/cineplex4.webp";
import { motion } from "framer-motion";
import StatsCounter from "./StatsCounter";
import Heading from "../../../components/Heading";

const TravelSection = () => {

    const destinations = [
        { img: cineplex1, name: "Shyamoli Cinema", location: "Dhaka" },
        { img: cineplex2, name: "Star Cineplex", location: "Dhaka" },
        { img: cineplex3, name: "Monihar Cinema Hall", location: "Jessore" },
        { img: cineplex4, name: "Silver Screen", location: "Barishal" }
    ];

    return (
        <div className="w-11/12 mx-auto mb-8 md:mb-16 lg:mb-20">
            <Heading
                subtitle={'Ultimate Movie Nights Await'}
                title={'Choose your favourite Cineplex'}
            >
            </Heading>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 py-8">
                {destinations.map((destination, index) => (
                    <motion.div
                        key={index}
                        className={`relative overflow-hidden group rounded-md ${index % 2 === 0 ? '-translate-y-8' : ''}`}
                        initial={{ opacity: 0, y: 70 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 + index * 0.2, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    >
                        {/* Image with hover scale */}
                        <motion.img
                            src={destination.img}
                            alt={destination.name}
                            className=" object-cover w-full h-[300px] md:h-[400px] transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Overlay with text */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-end p-4">
                            <h3 className="text-white font-bold text-lg">
                            {destination.name}
                            </h3>
                            <p className="text-white">
                                {destination.location}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TravelSection;
