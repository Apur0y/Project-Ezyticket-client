
import { motion } from "framer-motion";
import busImage from "../../../assets/Travel_image/travel-service/image1.jpg";
import busImage2 from "../../../assets/Travel_image/travel-service/bg-bus.jpg";
import { FaBus, FaCheckSquare } from "react-icons/fa";
import Heading from "../../../components/Heading";
import { Link } from "react-router-dom";

const AddTravelService = () => {
    return (
        <section >
            <div className=" mb-14 mx-20">
                <Heading
                subtitle="Grow Your Bus Bookings"
                title="Expand Your Bus Service and Increase Bookings with Us"
                ></Heading>
            </div>
            <div
                style={{
                    backgroundImage: `url(${busImage2})`,
                }}
                className="bg-fixed"
            >
                <div
                    className="container mx-auto py-16  px-6 flex flex-col md:flex-row items-center justify-center gap-10">
                    {/* Left Side - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2"
                    >
                        <img src={busImage} alt="Bus Service" className="rounded-lg shadow-lg w-full" />
                    </motion.div>

                    {/* Right Side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 text-center md:text-left"
                    >
                        <h2 className="flex justify-center items-center gap-5 text-3xl font-bold text-white">Expand Your Bus Service with Us! <FaBus className="text-main" /></h2>
                        <p className="mt-4 text-white text-lg">
                            List your bus service on our platform and reach thousands of passengers effortlessly.
                            Get more bookings, manage schedules easily, and grow your business with a seamless online ticketing system.
                        </p>

                        {/* Benefits List */}
                        <ul className="mt-4 text-white text-lg space-y-2">
                            <li className="flex items-center gap-2">
                                <FaCheckSquare className="text-main text-2xl" /> More Bookings & Revenue
                            </li>
                            <li className="flex items-center gap-2">
                                <FaCheckSquare className="text-main text-2xl" /> Easy Schedule & Ticket Management
                            </li>
                            <li className="flex items-center gap-2">
                                <FaCheckSquare className="text-main text-2xl" /> Secure & Fast Payments
                            </li>
                            <li className="flex items-center gap-2">
                                <FaCheckSquare className="text-main text-2xl" /> 24/7 Customer Support
                            </li>
                        </ul>
                        <Link to={"/dashboard/add-your-bus-service"}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 bg-main text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-white hover:border-main hover:border hover:text-black transition"
                        >
                            Add Your Bus Service
                        </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AddTravelService;
