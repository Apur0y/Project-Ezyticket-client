import {
  FaBus,
  FaCalendarAlt,
  FaPercentage,
  FaTicketAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Heading from "../../../components/Heading";
import DiscountImage from "../../../assets/Events_image/event-banner1.avif";
import DiscountImage2 from "../../../assets/Events_image/ride.webp";
import DiscountImage3 from "../../../assets/Events_image/event-banner3.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';
import { Autoplay, Pagination, EffectCreative } from 'swiper/modules';
import { FaUsers } from "react-icons/fa6";

const EventOffer = () => {
  const eventDeals = [
    {
      id: 1,
      title: "Premium Concert Tickets - 25% Off",
      discount: "25%",
      date: "June 15-20, 2023",
      minTickets: 2,
      promoCode: "CONCERT25",
      features: ["VIP access", "Backstage passes", "Meet & greet"],
      image: DiscountImage,
    },
    {
      id: 2,
      title: "Summer Festival Bundle - Buy 3 Get 1 Free",
      discount: "1 FREE",
      date: "July 5-10, 2023",
      minTickets: 4,
      promoCode: "FESTIVAL4",
      features: ["All-day access", "Food vouchers", "Early entry"],
      image: DiscountImage2,
    },
    {
      id: 3,
      title: "Sajek Tour - 15% Group Discount",
      discount: "15%",
      date: "August 12, 2023",
      minTickets: 5,
      promoCode: "TEAM15",
      features: ["Premium seating", "Exclusive merch", "Parking pass"],
      image: DiscountImage3,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <div className="">
      <div>
        <Heading
          title={"Book Your Events and Enjoy"}
          subtitle={"EzyTicket Events"}
        ></Heading>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true, margin: "-50px" }}
        className="w-11/12 mx-auto "
      >
        <div className="">
          {/* Main Offers Slider */}
          <motion.div variants={itemVariants} className="">
            <Swiper
              effect={"creative"}
              creativeEffect={{
                prev: {
                  shadow: true,
                  translate: [0, 0, 0],
                  rotate: [0, 0, 0],
                },
                next: {
                  translate: ["120%", 0, 0],
                },
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 3,
              }}
              modules={[EffectCreative, Autoplay, Pagination]}
              className="h-[500px] overflow-hidden shadow-2xl rounded-md"
            >
              {eventDeals.map((deal, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative h-full w-full">
                    <motion.img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 8, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end pb-8 px-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <motion.div
                        className="w-full"
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <motion.div className="flex items-center gap-3 mb-2">
                          <div className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-sm">
                            {deal.discount} OFF
                          </div>
                          <div className="text-white/90 text-sm flex items-center gap-1">
                            <FaUsers className="text-yellow-400" />
                            Min {deal.minTickets} tickets
                          </div>
                        </motion.div>

                        <motion.h3
                          className="text-2xl md:text-3xl font-bold mb-3 text-white"
                          variants={itemVariants}
                        >
                          {deal.title}
                        </motion.h3>

                        <motion.div className="flex items-center gap-3 mb-4 text-white/90">
                          <FaCalendarAlt className="text-yellow-400" />
                          <span>{deal.date}</span>
                        </motion.div>

                        <motion.ul className="grid grid-cols-2 md:grid-cols-1 gap-2 mb-4">
                          {deal.features.map((feature, i) => (
                            <motion.li
                              key={i}
                              className="flex items-center gap-2 text-white/90 text-sm"
                              variants={itemVariants}
                            >
                              <span className="text-yellow-400">✓</span>
                              {feature}
                            </motion.li>
                          ))}
                        </motion.ul>

                        <motion.div
                          className="flex  gap-3 items-center"
                          variants={itemVariants}
                        >
                          <div className="bg-black/40 backdrop-blur-sm py-1 px-2 rounded-md flex items-center gap-2 border border-white/20">
                            <FaTicketAlt className="text-yellow-400" />
                            <span className="font-mono font-bold text-white">
                              {deal.promoCode}
                            </span>
                          </div>
                          <motion.button
                            className="ezy-button-primary-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Get Tickets
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventOffer;
