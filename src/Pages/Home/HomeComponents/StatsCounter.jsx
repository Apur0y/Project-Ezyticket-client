import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useAuth from "../../../Hooks/useAuth";

const CounterItem = ({ targetNumber, label }) => {
    const {darkMode} = useAuth();
    const [count, setCount] = useState(0);
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true });

    useEffect(() => {
        if (inView) {
            // Animate the count
            let start = 0;
            const duration = 2000; // 2 seconds
            const increment = targetNumber / (duration / 16); // 60fps

            const timer = setInterval(() => {
                start += increment;
                if (start >= targetNumber) {
                    setCount(targetNumber);
                    clearInterval(timer);
                } else {
                    setCount(Math.ceil(start));
                }
            }, 16);

            // Bounce animation
            controls.start({
                scale: [1, 1.1, 1],
                transition: { duration: 0.8 }
            });

            return () => clearInterval(timer);
        }
    }, [inView, targetNumber, controls]);

    return (
        <motion.div
            ref={ref}
            animate={controls}
            className={`text-center flex flex-col justify-center items-center  py-4 rounded-md border  ${darkMode ? 'text-dark-primary bg-dark-surface border-gray-500' : 'bg-green-100 border-gray-200 text-gray-700'}`}
        >
            <div className="text-5xl md:text-7xl font-semibold  mb-2 flex items-center gap-2">
                {count} <span className="text-3xl">+</span>
            </div>
            <div className=" text-xs md:text-sm lg:text-base uppercase tracking-widest text-gray-500">
                {label}
            </div>
        </motion.div>
    );
};

const StatsCounter = () => {
    const stats = [
        { number: 12, label: "Destinations" },
        { number: 10, label: "Bus Companies" },
        { number: 36, label: "Buses" },
        { number: 250, label: "Happy Customers per day" }
    ];

    return (
        <section className="my-6">
            <div className="container mx-auto ">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <CounterItem
                            key={index}
                            targetNumber={stat.number}
                            label={stat.label}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsCounter;