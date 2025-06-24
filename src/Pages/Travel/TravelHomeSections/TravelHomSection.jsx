import useAuth from "../../../Hooks/useAuth";
import busImage from "../../../assets/Travel_image/travel-service/homebus.png"
import { motion } from "motion/react"


function TravelHomSection() {
    const { darkMode } = useAuth();
    return (
        <section className="pb-16 overflow-x-hidden">
            <div className="w-11/12 mx-auto mb-10">
                <p className="text-xl text-supporting font-semibold mb-1 border-l-4 border-supporting pl-2">Travel</p>
                <h3 className={`text-4xl font-bold ${darkMode && 'text-dark-primary'}`}>Book Adventures Seamlessly</h3>
            </div>
            <div className="bg-dark-supporting py-10">

                <div className="container px-5 mx-auto flex flex-col md:flex-row justify-between gap-10 mt-10">
                    {/* text */}
                    <div className="flex-1/2">
                        <p className="text-2xl font-semibold mb-8">Get Started Now</p>
                        <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-2 text-[#fdfffe]">We Are Best Bus Service In The Bangladesh</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi beatae quos autem quidem ullam earum aspernatur numquam possimus enim adipisci?</p>
                        <button className="btn bg-main border-main shadow text-white mt-8">Get Started</button>
                    </div>
                    {/* image */}
                    <div className="flex-1/2 relative">
                        <motion.div
                       initial={{ opacity: 1, x: 500 }}
                       whileInView={{ opacity: 1, x: 100 }}
                       transition={{ duration: 2, delay:0.5 }}
                        >
                            <img src={busImage} alt="" className="w-full" />
                        </motion.div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default TravelHomSection;