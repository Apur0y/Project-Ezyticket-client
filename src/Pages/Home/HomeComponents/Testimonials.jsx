import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";

const Testimonials = () => {
    const { darkMode } = useAuth();
    const testimonials = [
        {
            id: 1,
            name: "Dr. Jahangir Kabir",
            role: "Physicians and Surgeons",
            rating: 5,
            content: "EzyTicket made my intercity travel so much easier! I booked my Dhaka to Chattogram bus ticket within minutes — no queues, no hassle. Everything was smooth and on time!",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            accentColor: "bg-blue-500"
        },
        {
            id: 2,
            name: "Sarah Miller",
            role: "Fitness Trainer",
            rating: 4,
            content: "I never miss my favorite concerts anymore! Thanks to EzyTicket, I got front-row seats for the Coke Studio live event last month. Super convenient and reliable!",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            accentColor: "bg-green-500"
        },
        {
            id: 3,
            name: "Michael Chen",
            role: "Marathon Runner",
            rating: 5,
            content: "Booking movie tickets used to be a headache — not anymore! I just select the showtime and seat on EzyTicket and enjoy the film stress-free. It’s now my go-to app for entertainment!",
            image: "https://randomuser.me/api/portraits/men/75.jpg",
            accentColor: "bg-orange-500"
        }
    ];

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
                damping: 20
            }
        }
    };

    return (
        <section className="w-11/12 mx-auto mb-8 md:mb-16 lg:mb-20">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <p className="uppercase text-xl font-semibold text-center text-main mb-2">Testimonials</p>
                    <h3 className={`uppercase text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 ${darkMode ? "text-dark-primary" : "text-gray-700"}`}>What Our Customers Say</h3>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                >
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            variants={item}
                            whileHover={{ y: -10 }}
                            className="flex"
                        >
                            <div className={`px-6 py-16 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full w-full relative overflow-hidden group border ${darkMode ? 'bg-dark-surface border-gray-400 shadow-gray-400': 'bg-white border-gray-200'}`}>
                                {/* Decorative accent circle */}
                                <div
                                    className={`absolute -top-16 -left-16 h-40 w-40 ${testimonial.accentColor} rounded-full opacity-10 transition-all duration-500 ease-in-out z-0 group-hover:scale-[12] group-hover:opacity-10 group-hover:-top-full group-hover:-left-full`}
                                    style={{
                                        transformOrigin: 'top left',
                                    }}
                                ></div>

                                {/* Content */}
                                <div className="z-10 relative">
                                    <div className="flex items-center mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} text-lg`}
                                            />
                                        ))}
                                    </div>
                                    <FaQuoteLeft className="text-gray-300 text-3xl mb-4" />
                                    <p className={`mb-6 flex-grow text-lg leading-relaxed ${darkMode ? 'text-dark-primary' : 'text-gray-600'}`}>{testimonial.content}</p>
                                    <div className="flex items-center mt-auto">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white shadow"
                                        />
                                        <div>
                                            <h4 className={`font-bold ${darkMode ? 'text-dark-primary' : 'text-gray-800'}`}>{testimonial.name}</h4>
                                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
