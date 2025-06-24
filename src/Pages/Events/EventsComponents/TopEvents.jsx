import Loading from "../../../Shared/Loading/Loading";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Heading from "../../../components/Heading";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TopEvents = () => {
    const { darkMode } = useAuth();
    const axiosPublic = useAxiosPublic();

    const {
        data: events = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["topEvents"],
        queryFn: async () => {
            const res = await axiosPublic.get("/topEvents");
            return res.data.sort(
                (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
            );
        },
    });

    if (isLoading)
        return (
            <p className="text-center text-lg mt-30">
                <Loading />
            </p>
        );

    if (error)
        return <p className="text-center text-red-500">Error: {error.message}</p>;

    return (
        <div
            className={`mb-8 md:mb-16 lg:mb-20 ${darkMode ? "bg-dark-background text-dark-primary" : "bg-background"}`}
            id="eventsCard"
        >
            <div className="mx-auto w-11/12">
                <div className="">
                    <Heading title={"Only the Best, Just for You"} subtitle={"EzyTicket Top Events"} />
                </div>
                {/* Mobile: Stack cards vertically */}
                <div className="flex flex-col space-y-4 md:hidden">
                    {events.slice(0, 3).map((event, index) => (
                        <motion.div
                            key={index}
                            className="relative overflow-hidden group rounded-md"
                            initial={{ opacity: 0, y: 70 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 + index * 0.2, ease: "easeInOut" }}
                            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                        >
                            <Link
                                to={`/eventdetailspublic/${event._id}`}
                                className="block h-full"
                            >
                                <motion.img
                                    src={event.image}
                                    alt={event.title}
                                    className="object-cover w-full h-[300px]"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex justify-between items-end">
                                    <h3 className="text-white font-bold text-lg md:text-xl"
                                    >
                                        {event.title}
                                    </h3>
                                    {/* Ticket and Date Info - Animated with Framer */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{opacity: 1, y: 0,
                                                transition: {
                                                    duration: 0.4,
                                                    ease: "easeOut"
                                                }
                                                
                                            }
                                        }
                                        viewport={{ once: true, margin: "0px 0px -100px 0px" }}

                                        className="overflow-hidden text-sm md:text-base text-end"
                                    >
                                        <p className="text-white mt-2">
                                            {event.totalTickets - event.soldTickets} Tickets Left
                                        </p>
                                        <p className="text-white">
                                            {event.eventDate}
                                        </p>
                                    </motion.div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Desktop: 3-column grid with staggered effect */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
                    {events.slice(0, 3).map((event, index) => (
                        <motion.div
                            key={index}
                            className={`relative overflow-hidden group rounded-md ${index % 2 === 0 ? '-translate-y-8' : ''}`}
                            initial={{ opacity: 0, y: 70 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover="hover"
                            transition={{ duration: 0.5 + index * 0.2, ease: "easeInOut" }}
                            viewport={{ once: true }}
                        >
                            <Link to={`/eventdetailspublic/${event._id}`}
                                className="block h-full"
                            >
                                {/* Image with hover scale */}
                                <motion.img
                                    src={event.image}
                                    alt={event.title}
                                    className="object-cover w-full h-[300px] md:h-[450px]"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Overlay with text */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex justify-between items-end">

                                    <h3 className="text-white font-bold text-lg md:text-xl"
                                    >
                                        {event.title}
                                    </h3>

                                    {/* Ticket and Date Info - Animated with Framer */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        variants={{
                                            hover: {
                                                opacity: 1,
                                                y: 0,
                                                transition: {
                                                    duration: 0.4,
                                                    ease: "easeOut"
                                                }
                                            }
                                        }}
                                        className="overflow-hidden hidden group-hover:block text-end"
                                    >
                                        <p className="text-white mt-2">
                                            {event.totalTickets - event.soldTickets} Tickets Left
                                        </p>
                                        <p className="text-white">
                                            {event.eventDate}
                                        </p>
                                    </motion.div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopEvents;