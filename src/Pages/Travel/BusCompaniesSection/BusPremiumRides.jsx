import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBus, FaStar, FaRegStar, FaSearch, FaCrown, FaWifi, FaPlug, FaArrowRight } from 'react-icons/fa';
import { RiCustomerServiceFill, RiRouteLine } from 'react-icons/ri';

const BusCompaniesSection = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const companies = [
    {
      name: 'Express Travels',
      icon: <FaBus className="text-blue-600" />,
      destinations: ['New York', 'Boston'],
      rating: 4,
      departure: 'Every 2 hours',
      price: '$$',
      amenities: ['wifi', 'power'],
      popular: true,
      image: 'bg-[url(https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=400)]'
    },
    {
      name: 'City Connect',
      icon: <FaBus className="text-emerald-600" />,
      destinations: ['Chicago', 'Detroit'],
      rating: 5,
      departure: 'Hourly',
      price: '$$$',
      amenities: ['wifi', 'power', 'service'],
      premium: true,
      image: 'bg-[url(https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?auto=format&fit=crop&w=400)]'
    },
    {
      name: 'Metro Lines',
      icon: <FaBus className="text-purple-600" />,
      destinations: ['San Francisco', 'Los Angeles'],
      rating: 3,
      departure: 'Every 3 hours',
      price: '$',
      amenities: ['wifi'],
      image: 'bg-[url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400)]'
    },
  ];

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            Discover <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Premium Rides</span>
          </h1>
          <p className="text-lg text-slate-600">Experience comfort with trusted bus operators</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 max-w-3xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-lg rounded-xl transition-all duration-300 group-hover:bg-white/90" />
            <div className="relative flex items-center">
              <FaSearch className="absolute left-5 text-slate-400 text-xl z-10" />
              <input
                type="text"
                placeholder="Search destinations or companies..."
                className="w-full p-5 pl-16 text-lg rounded-xl border-0 ring-2 ring-slate-200/50 focus:ring-4 focus:ring-blue-500/20 bg-transparent placeholder-slate-400 focus:bg-white/50 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {/* Companies Grid */}
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCompanies.map((company, index) => (
              <motion.article
                key={company.name}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', delay: index * 0.1, stiffness: 120 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                {/* Company Image Header */}
                <div className={`${company.image} bg-cover bg-center h-48 rounded-t-2xl relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  {company.popular && (
                    <div className="absolute top-4 right-4 bg-amber-400 text-slate-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 z-10">
                      <FaCrown className="text-sm" /> Popular Choice
                    </div>
                  )}
                  {company.premium && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 z-10">
                      <FaCrown className="text-sm" /> Premium Service
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="bg-white rounded-b-2xl shadow-lg p-6 -mt-2 relative z-20 border border-slate-100 group-hover:border-blue-200/50 transition-all">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800">{company.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <RiRouteLine className="text-slate-400" />
                        <span className="text-slate-600">{company.departure}</span>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">{company.price}</span>
                  </div>

                  {/* Destinations */}
                  <div className="flex items-center justify-between bg-slate-50/50 p-4 rounded-xl mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold text-blue-600">{company.destinations[0]}</span>
                      <FaArrowRight className="text-slate-400" />
                      <span className="text-lg font-semibold text-purple-600">{company.destinations[1]}</span>
                    </div>
                  </div>

                  {/* Rating & Amenities */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          i < company.rating ? (
                            <FaStar key={i} className="text-amber-400 text-xl" />
                          ) : (
                            <FaRegStar key={i} className="text-slate-300 text-xl" />
                          )
                        ))}
                      </div>
                      <span className="text-slate-600 font-medium">{company.rating}/5</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {company.amenities?.includes('wifi') && (
                        <div className="flex items-center gap-2 bg-blue-50/50 px-3 py-2 rounded-lg text-sm text-blue-600">
                          <FaWifi className="text-lg" /> Free WiFi
                        </div>
                      )}
                      {company.amenities?.includes('power') && (
                        <div className="flex items-center gap-2 bg-emerald-50/50 px-3 py-2 rounded-lg text-sm text-emerald-600">
                          <FaPlug className="text-lg" /> Power Outlets
                        </div>
                      )}
                      {company.amenities?.includes('service') && (
                        <div className="flex items-center gap-2 bg-purple-50/50 px-3 py-2 rounded-lg text-sm text-purple-600">
                          <RiCustomerServiceFill className="text-lg" /> 24/7 Support
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <motion.button 
                      whileHover={{ x: 5 }}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-xl transition-all"
                    >
                      Book Journey
                      <FaArrowRight className="text-sm transform transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </AnimatePresence>

        {filteredCompanies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-slate-500 text-xl"
          >
            No results found for "{searchTerm}"
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BusCompaniesSection;