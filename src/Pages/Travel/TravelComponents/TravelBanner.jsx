import { Link } from "react-router-dom";
import travelBannerImage from "../../../assets/Travel_image/Bus3.jpg"
import BannerCard from "./BannerCard";
import useCardData from "./useCardData";
import SelectPlaceTime from "../TravelTicekBook/SelectPlaceTime";
import { motion } from "framer-motion";

const TravelBanner = () => {
    const [travelCards] = useCardData()

    const handleScroll = () => {
        const section = document.getElementById("scroll-section");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };



    return (
        <>
            <div className="relative mb-40 h-[720px] md:h-[450px] xl:h-[470px]">
                <div
                    className="hero md:min-h-[500px] min-h-screen bg-cover"
                    style={{
                        backgroundImage: `url(${travelBannerImage})`,
                    }}>
                    <div className="hero-overlay"></div>
                    <div className="hero-content text-neutral-content text-center">
                        <div className="">
                            <motion.h1
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.5 }}
                             className='text-2xl font-bold md:text-3xl lg:text-5xl'>Smart Bus Ticket Booking <br /><span className="text-main">Fast, Easy & Secure!</span> </motion.h1>
                            <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className='my-4'>Book Your Bus Tickets Anytime, Anywhere – Hassle-Free & Instant Confirmation!</motion.p>

                        </div>
                    </div>
                </div>
                {/* cards */}

                <div className="flex justify-center items-center">
                    <div className=" absolute z-20 top-[380px] md:top-[400px]  ">
                        <div className="text-black md:px-5">
                            <SelectPlaceTime />
                        </div>
                    </div>

                </div>

            </div>

            <div>
                <BannerCard/>
            </div>

        </>
    )
}

export default TravelBanner;