import { motion } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import useCardData from "./useCardData";
const BannerCard = () => {
    const [travelCards] = useCardData()
    const { darkMode } = useAuth()
    return (
        <section className="pt-14">
            <div className="text-center flex justify-center items-center text-2xl md:text-3xl lg:text-5xl mb-10 flex-col">
                {/* <p className="text-sm font-semibold  uppercase">Quick & Easy Ticket Booking</p> */}
                <p className={`text-[16px] ${darkMode ? 'text-dark-secondary' : 'text-gray-500'} mt-4 max-w-[1000px] px-5 mb-2`}>Book in 4 Easy Steps</p>
                <h1 className={`text-2xl font-bold md:text-3xl lg:text-5xl ${darkMode ? 'text-dark-primary' : 'text-gray-700'}`}>Just 4 Simple Steps to Reserve Your Seat</h1>
                
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 container mx-auto px-5">
                {
                    travelCards.map((card, idx) =>
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 200 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 * idx + 0.8, ease: "easeInOut" }}
                            className={`${darkMode ? "bg-[#1d1d1d] text-white" : "bg-white text-[#111111]"} shadow-2xl rounded p-5 flex flex-col justify-between text-center py-10`}>
                            <div>
                                <div className="text-center text-4xl mb-5 text-white  flex justify-center items-center ">
                                    <span className="p-5 bg-main rounded-2xl">

                                        {card?.icon}
                                    </span>
                                </div>
                                <h3 className='text-xl text-main md:text-2xl font-semibold'>{card?.title}</h3>
                                <p className=''>{card?.description}</p>
                            </div>
                        </motion.div>
                    )
                }
            </div>
        </section>

    )
}

export default BannerCard;