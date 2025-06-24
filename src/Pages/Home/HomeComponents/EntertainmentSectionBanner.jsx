import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import cinemaBanner from "../../../assets/Home_image/banner-cineplex.jpg"


const EntertainmentSectionBanner = () => {
    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: true
    });

    return (
        <div
            style={{
                backgroundImage: `url(${cinemaBanner})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}
            className="relative h-[70vh] md:h-[80vh] w-full flex items-end pb-8 md:pb-16 mb-8 md:mb-16 lg:mb-20" // Changed to items-end for bottom alignment
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0  bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

            {/* Content Container */}
            <motion.div
                ref={ref}
                className="relative z-10 w-full"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="w-11/12 mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-8">
                    <div className="flex flex-col">
                        <motion.h1
                            className="uppercase text-4xl md:text-6xl font-semibold text-gray-300 tracking-wide leading-[1.1]"
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Ultimate <br /> <span className="text-main">Movie Experience</span>
                        </motion.h1>

                        <motion.p
                            className="uppercase text-xl font-semibold text-gray-300 tracking-wide leading-[1.1]"
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Book tickets for the latest blockbusters in premium comfort
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Link to="/entertainment">
                            <button
                                className="hover:bg-gray-300 hover:text-gray-900 border border-gray-300 text-gray-300 font-semibold px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base lg:text-lg cursor-pointer transition-all duration-300"
                            >
                                Book Tickets
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default EntertainmentSectionBanner;