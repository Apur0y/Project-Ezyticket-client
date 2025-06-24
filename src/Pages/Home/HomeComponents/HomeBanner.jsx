import { useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import HomeTravelCard from './BannerCards/HomeTravelCard';
import travelVideo from "../../../assets/Home_image/travelVideo2.mp4";

const HomeBanner = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.7;
            
            // Handle autoplay with fallback
            const playPromise = videoRef.current.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Autoplay prevented:", error);
                    // Fallback: mute the video if autoplay was prevented
                    videoRef.current.muted = true;
                    videoRef.current.play();
                });
            }
        }
    }, []);

    return (
        <div className='h-[70vh] md:h-[50vh] lg:h-[70vh] relative shadow-md mb-8 md:mb-16 lg:mb-20'>
            {/* Video Background with slower playback */}
            <div className="absolute inset-0 z-0">
                <video 
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src={travelVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0  bg-gradient-to-t from-black/50 via-black/30 to-black/10"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col md:justify-center items-center text-center px-4 pt-12 md:pt-0">
                <motion.h1 
                    className='uppercase text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 pt-12 md:pt-0'
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Your Next Adventure <br />
                    <span className="text-main">Fast, Easy & Secure Booking!</span>
                </motion.h1>
                
                <motion.p 
                    className=' text-lg text-white/90 mb-8 max-w-2xl hidden md:block'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    Book Your Bus Tickets Anytime, Anywhere – Hassle-Free & Instant Confirmation!
                </motion.p>
            </div>

            {/* Travel Card */}
            <div className="flex justify-center items-center absolute -bottom-72 md:-bottom-24 lg:-bottom-30 z-20 w-full">
                <motion.div 
                    className="w-11/12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <HomeTravelCard />
                </motion.div>
            </div>
        </div>
    );
};

export default HomeBanner;