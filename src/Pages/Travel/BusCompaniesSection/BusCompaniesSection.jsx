import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBus, FaHandshake, FaRegClock, FaRoute, FaWifi, FaPlug, FaSnowflake, FaStar } from 'react-icons/fa';
import { TbAirConditioning } from 'react-icons/tb';
import Heading from '../../../components/Heading';
import useAuth from '../../../Hooks/useAuth';

const BusPartnersSection = () => {
  const { darkMode } = useAuth()

  const partners = [
    {
      name: 'Shohagh Paribahan',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC6Br4x4iQdSsuUsR5IuDsAJAFmXNbKTb0Pw&s',
      since: 2024,
      routes: 1,
      features: ['ac'],
      tags: ['affordable'],
      rating: 4.2,
      description: 'Reliable intercity AC service with refund option',
    },
    {
      name: 'Green Line Paribahan',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC6Br4x4iQdSsuUsR5IuDsAJAFmXNbKTb0Pw&s',
      since: 2023,
      routes: 1,
      features: ['non-ac'],
      tags: ['economy'],
      rating: 3.9,
      description: 'Non-AC service with multiple seat bookings available',
    },
    {
      name: 'Hanif Enterprise',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC6Br4x4iQdSsuUsR5IuDsAJAFmXNbKTb0Pw&s',
      since: 2015,
      routes: 1,
      features: ['ac'],
      tags: ['comfortable'],
      rating: 4.5,
      description: 'Comfortable AC service to Rajshahi with refund support',
    },
    {
      name: 'Ena Transport',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC6Br4x4iQdSsuUsR5IuDsAJAFmXNbKTb0Pw&s',
      since: 2015,
      routes: 1,
      features: ['ac'],
      tags: ['premium'],
      rating: 4.6,
      description: 'Premium long-distance service with refund option',
    },
    {
      name: 'Desh Travels',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC6Br4x4iQdSsuUsR5IuDsAJAFmXNbKTb0Pw&s',
      since: 2018,
      routes: 1,
      features: ['ac'],
      tags: ['holiday'],
      rating: 4.3,
      description: 'AC holiday trip with convenient timing but no refund',
    },
    {
      name: 'Shyamoli Paribahan',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC6Br4x4iQdSsuUsR5IuDsAJAFmXNbKTb0Pw&s',
      since: 2025,
      routes: 1,
      features: ['non-ac'],
      tags: ['budget'],
      rating: 4.0,
      description: 'Non-AC budget service suitable for family trips',
    },
    {
      name: 'Soukhin Paribahan',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC6Br4x4iQdSsuUsR5IuDsAJAFmXNbKTb0Pw&s',
      since: 2015,
      routes: 1,
      features: ['ac'],
      tags: ['office'],
      rating: 4.1,
      description: 'AC bus suited for office travel with refund policy',
    },
    {
      name: 'Royal Coach',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC6Br4x4iQdSsuUsR5IuDsAJAFmXNbKTb0Pw&s',
      since: 2015,
      routes: 1,
      features: ['non-ac'],
      tags: ['early-morning'],
      rating: 3.8,
      description: 'Non-AC service for night/early morning journeys',
    },
    {
      name: 'Saint Martin Paribahan',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC6Br4x4iQdSsuUsR5IuDsAJAFmXNbKTb0Pw&s',
      since: 2015,
      routes: 1,
      features: ['ac'],
      tags: ['adventure'],
      rating: 4.7,
      description: 'Adventure trips to Teknaf with full refund support',
    },
    {
      name: 'Eagle Paribahan',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC6Br4x4iQdSsuUsR5IuDsAJAFmXNbKTb0Pw&s',
      since: 2015,
      routes: 1,
      features: ['non-ac'],
      tags: ['group'],
      rating: 4.0,
      description: 'Non-AC late night service for groups and friends',
    },
  ];


  const featureIcons = {
    wifi: <FaWifi className="text-blue-400" />,
    charging: <FaPlug className="text-green-400" />,
    ac: <TbAirConditioning className="text-red-400" />,
    'eco-friendly': <FaSnowflake className="text-emerald-400" />,
    luxury: <FaStar className="text-supporting" />,
  };

  return (
    <section className="relative py-20  overflow-hidden">
      {/* Background Elements */}

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Heading
            subtitle={"Strategic Partnerships"}
            title={"Our Trusted Transport Allies"}
          ></Heading>
        </motion.div>


        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {partners?.slice(0,6).map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0  rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity`} />

                <div className={`relative ${darkMode ? "bg-[#1d1d1d] text-white" : "bg-white text-black"}  rounded-2xl p-6 h-full overflow-hidden shadow-xl transition-all`}>
                  {/* Partner Header */}
                  <div className="flex items-start justify-between mb-6">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-20 h-20  p-2 object-cover  rounded-xl"
                    />
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full">
                      <FaStar className="text-amber-400 text-sm" />
                      <span className="text-xl font-semibold text-amber-400">{partner.rating}</span>
                    </div>
                  </div>

                  {/* Partner Details */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{partner.name}</h3>
                    <p className="">{partner.description}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4 mb-6">
                    <div className="flex items-center gap-2 ">
                      <FaRegClock className="text-main" />
                      <span className="text-sm">Since {partner.since}</span>
                    </div>
                    <div className="flex items-center gap-2 ">
                      <FaRoute className="text-supporting" />
                      <span className="text-sm">{partner.routes}+ Routes</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {partner.features.map(feature => (
                      <motion.div
                        key={feature}
                        whileHover={{ scale: 1.05 }}
                        className={`flex items-center gap-2 ${darkMode ? "bg-dark-surface" : "bg-gray-100"} px-3 py-2 rounded-lg backdrop-blur-sm`}
                      >
                        {featureIcons[feature]}
                        <span className="text-sm  capitalize">{feature.replace('-', ' ')}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Collaboration Badge */}
                  <div className="pt-4 border-t border-dark">
                    <div className="flex items-center gap-2 text-main">
                      <FaHandshake className="text-xl animate-pulse" />
                      <span className="text-sm font-semibold">Certified Partner</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Partnership Metrics */}
        <motion.div
          className={`mt-16 ${darkMode ? "bg-[#1d1d1d]" : "bg-white"} rounded-2xl p-8 backdrop-blur-lg shadow-xl`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '10+', label: 'Years Experience', icon: <FaRegClock className="text-3xl text-blue-400" /> },
              { value: '50+', label: 'Active Partners', icon: <FaHandshake className="text-3xl text-purple-400" /> },
              { value: '1M+', label: 'Monthly Passengers', icon: <FaBus className="text-3xl text-emerald-400" /> },
              { value: '24/7', label: 'Support', icon: <TbAirConditioning className="text-3xl text-amber-400" /> },
            ].map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-4 ${darkMode ? "bg-dark-surface text-white" : "bg-gray-100"} transition-colors  rounded-2xl`}
              >
                <div className="mb-3">{metric.icon}</div>
                <div className="text-4xl font-bold  mb-1">{metric.value}</div>
                <div className="text-sm ">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusPartnersSection;


