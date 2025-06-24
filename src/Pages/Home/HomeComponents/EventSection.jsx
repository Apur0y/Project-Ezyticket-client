import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import groupTour from "../../../assets/Home_image/groupTour.webp";
import concert from "../../../assets/Home_image/concert.webp";
import seminar from "../../../assets/Home_image/seminar.webp";
import rides from "../../../assets/Home_image/rides.webp";
import park from "../../../assets/Home_image/park.webp";

const EventSection = () => {
    const { darkMode } = useAuth();

    // Animation variants with slower timing
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
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

    const imageItem = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
            }
        }
    };

    return (
        <section className={`mb-8 md:mb-16 lg:mb-20 w-11/12 mx-auto ${darkMode ? 'bg-dark-bg' : 'bg-gray-50'}`}>
            <div className="">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    variants={container}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-16"
                >
                    {/* Left Column */}
                    <motion.div variants={item} className="space-y-8">
                        <div>
                            <motion.div variants={item} className="mb-4">
                                <p className={`tracking-widest uppercase mb-2 ${darkMode ? 'text-dark-secondary' : 'text-gray-500'}`}>
                                    EzyTicket Events
                                </p>
                                <h2 className={`uppercase text-3xl md:text-5xl font-bold tracking-wide leading-[1.1] ${darkMode ? 'text-dark-primary' : 'text-gray-700'}`}>
                                    Book Unforgettable Experiences
                                </h2>
                            </motion.div>

                            <motion.p
                                variants={item}
                                className={`text-lg py-4 ${darkMode ? 'text-dark-secondary' : 'text-gray-500'}`}
                                transition={{ delay: 0.1 }} // Added slight delay
                            >
                                Discover the most exciting concerts, festivals, and cultural events across the country.
                                <br />
                                With EzyTicket, you get instant booking confirmation, exclusive early access to premium seats,
                                and personalized recommendations for events you'll love. Our platform makes event planning
                                effortless so you can focus on creating memories.
                            </motion.p>
                            <motion.div
                                variants={item}
                                transition={{ delay: 0.2 }} // Added delay
                                className="mt-4"
                            >
                                <Link to="/events">
                                    <motion.button
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.3 }
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                            transition: { duration: 0.2 }
                                        }}
                                        className='ezy-button-primary'
                                        transition={{ type: "spring" }}
                                    >
                                        Explore Events
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </div>

                        <div>
                            <motion.div variants={container} className="grid grid-cols-2 gap-2 h-full">
                                <motion.div
                                    variants={imageItem}
                                    className="relative h-64 md:h-80 rounded-md overflow-hidden"
                                    whileHover={{ scale: 0.98 }}
                                >
                                    <img
                                        src={seminar}
                                        alt="Seminar event"
                                        className="w-full h-full object-cover absolute inset-0"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                                        <h3 className="text-white font-bold text-lg">Educational Seminars</h3>
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={imageItem}
                                    className="relative h-64 md:h-80 rounded-md overflow-hidden"
                                    whileHover={{ scale: 0.98 }}
                                >
                                    <img
                                        src={park}
                                        alt="Park event"
                                        className="w-full h-full object-cover absolute inset-0"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                                        <h3 className="text-white font-bold text-lg">Family Outings</h3>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Column */}
                    <div>
                        {/* Right Column - Image Grid */}
                        <div className="mb-6">
                            <motion.div variants={container} className="grid grid-cols-2 gap-2 h-full">
                                <motion.div
                                    variants={imageItem}
                                    className="relative h-64 md:h-80 rounded-md overflow-hidden"
                                    whileHover={{ scale: 0.98 }}
                                >
                                    <img
                                        src={concert}
                                        alt="Concert event"
                                        className="w-full h-full object-cover absolute inset-0"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                                        <h3 className="text-white font-bold text-lg">Live Concerts</h3>
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={imageItem}
                                    className="relative h-64 md:h-80 rounded-md overflow-hidden"
                                    whileHover={{ scale: 0.98 }}
                                >
                                    <img
                                        src={rides}
                                        alt="Amusement rides"
                                        className="w-full h-full object-cover absolute inset-0"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                                        <h3 className="text-white font-bold text-lg">Thrilling Rides</h3>
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={imageItem}
                                    className="relative h-64 md:h-80 rounded-md overflow-hidden col-span-2"
                                    whileHover={{ scale: 0.98 }}
                                >
                                    <img
                                        src={groupTour}
                                        alt="Group tour"
                                        className="w-full h-full object-cover absolute inset-0"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                                        <h3 className="text-white font-bold text-lg">Group Adventures</h3>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Right side text */}
                        <motion.div
                            variants={item}
                            transition={{ delay: 0.3 }}
                        >
                            <motion.p
                                className={`text-lg py-4 ${darkMode ? 'text-dark-secondary' : 'text-gray-500'}`}
                            >
                                From live music to cultural celebrations, we bring the best events right to your screen.
                                Get early access to top picks, secure your spot in seconds, and make every outing unforgettable.
                                With EzyTicket, your next great memory is just a click away.
                            </motion.p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default EventSection;