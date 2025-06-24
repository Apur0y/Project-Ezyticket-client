import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useAuth from "../../Hooks/useAuth";

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
            className={` flex   md:py-4 rounded-md  ${darkMode ? '' : ''}`}
        >
            <div className="text-sm md:text-2xl font-semibold  mb-2 flex items-center gap-2">
                <p>More than</p> <p className="text-main">{count}+</p> <p>people liked us!</p>
            </div>
            
        </motion.div>
    );
};

const AboutCounter = () => {
    const stats = [
       
        { number: 100000, label: "Happy Customers per day" }
    ];

    return (
        <section className="">
            <div className="container mx-auto ">
                <div className=" gap-4">
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

export default AboutCounter;