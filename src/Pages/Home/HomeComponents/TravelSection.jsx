import { FaPlane, FaTag, FaMapMarkerAlt, FaRegSmile, FaBus } from "react-icons/fa";
import { Link } from "react-router-dom";
import dhaka from "../../../assets/Home_image/dhaka.webp";
import merinDrive from "../../../assets/Home_image/marinDrive.webp";
import sylhet from "../../../assets/Home_image/sylhet.webp";
import chittagong from "../../../assets/Home_image/chittagong.jpg";
import { motion } from "framer-motion";
import StatsCounter from "./StatsCounter";
import Heading from "../../../components/Heading";

const TravelSection = () => {

    const destinations = [
        { img: dhaka, name: "Dhaka" },
        { img: sylhet, name: "Sylhet" },
        { img: merinDrive, name: "Cox's Bazar" },
        { img: chittagong, name: "Chittagong" }
    ];

    return (
        <div className="w-11/12 mx-auto mb-8 md:mb-16 lg:mb-20">
            <Heading
                subtitle={'Choose your Destination'}
                title={'Make your journey hassle free'}
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
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <h3 className="text-white font-bold text-xl md:text-2xl">
                                {destination.name}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div>
                <StatsCounter></StatsCounter>
            </div>
        </div>
    );
};

export default TravelSection;
