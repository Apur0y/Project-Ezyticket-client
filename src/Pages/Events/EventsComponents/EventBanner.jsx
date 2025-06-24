// import React, { useRef } from 'react';
import { FaTicketAlt } from 'react-icons/fa';
import eventBanner from '../../../assets/Events_image/show.webp';
import { motion } from "framer-motion";
import { FaArrowDownLong } from 'react-icons/fa6';

const EventBanner = ({scrollToSection}) => {
    return (
        <>
            <div
                className="relative bg-cover bg-center h-[60vh] md:h-[70vh] lg:h-[80vh] flex text-white mb-8 md:mb-16 lg:mb-20"
                style={{
                    backgroundImage: `url(${eventBanner})`
                }}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/30 to-transparent"></div>

                <div className="absolute bottom-20 md:bottom-10 left-4 md:left-10 z-10">
                    <p className="tracking-wide uppercase mb-1 md:mb-2 text-base md:text-xl">Limited Seats Available</p>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide uppercase ">
                       Make Moments <br /> <span className="text-main">Become Memories</span>
                    </h1>
                </div>
                <div 
                    className="absolute bottom-4 md:bottom-10 right-4 md:right-10 flex items-center gap-3 cursor-pointer"
                    onClick={()=>scrollToSection("eventsCard")}
                >
                    <h3 className="uppercase text-sm md:text-xl font-lg">Scroll down</h3>
                    <motion.div
                        animate={{
                            y: [0, 10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <FaArrowDownLong className="text-sm md:text-lg font-thin" />
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default EventBanner;