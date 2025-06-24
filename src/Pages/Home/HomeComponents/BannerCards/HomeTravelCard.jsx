import React, { useState } from 'react';
import useTravelContext from '../../../../Hooks/TrevalHook/useTravelContext';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useAuth from '../../../../Hooks/useAuth';
import { FaExchangeAlt, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const HomeTravelCard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { darkMode } = useAuth();
    const { searchData, setSearchData, districts, setFilterBus } = useTravelContext();
    const [isSwapped, setIsSwapped] = useState(false);

    const handleSwapLocations = () => {
        const form = document.forms[0];
        const temp = form.fromDistrict.value;
        form.fromDistrict.value = form.toDistrict.value;
        form.toDistrict.value = temp;
        setIsSwapped(!isSwapped);
    };

    const handleSearchData = async (e) => {
        e.preventDefault();
        const form = e.target;
        const fromDistrict = form.fromDistrict.value.trim();
        const toDistrict = form.toDistrict.value.trim();
        const date = form.date.value;

        if (!fromDistrict || !toDistrict || !date) {
            toast.warn('Please fill in all fields')
            return;
        }

        if (fromDistrict === toDistrict) {
            toast.error("Departure and arrival locations cannot be the same");
            return;
        }

        const placeTimeData = { stand1: fromDistrict, stand2: toDistrict, date };
        setSearchData(placeTimeData);

        try {
            const { data } = await axiosSecure.get("/api/stand", { params: placeTimeData });
            setFilterBus(data);
            if (location.pathname === "/travel" || location.pathname === "/") {
                navigate("/travel/bus-ticket-book");
            }
        } catch (err) {
            console.error("Search error:", err);
            alert('Failed to search. Please try again.');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=""
        >
            <section className={`rounded-xl shadow-xl overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <div className="p-1 bg-gradient-to-r from-green-700 to-green-400"></div>

                <div className="p-6 md:p-8">
                    <h3 className="text-2xl font-bold mb-6 text-main border-b pb-2">
                        Book Your Journey
                    </h3>

                    <form onSubmit={handleSearchData} className="grid grid-cols-12 gap-4 items-end">
                        {/* From Location */}
                        <div className="col-span-12 md:col-span-3">
                            <label className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                From
                            </label>
                            <select
                                name="fromDistrict"
                                defaultValue={searchData?.stand1 || ""}
                                className={`w-full p-3 rounded-lg border ${darkMode ?
                                    "bg-gray-700 border-gray-600 text-white" :
                                    "bg-gray-50 border-gray-300 text-gray-900"}`}
                                required
                            >
                                <option value="" disabled>Select departure</option>
                                {districts.map((stand, idx) => (
                                    <option key={idx} value={stand}>{stand}</option>
                                ))}
                            </select>
                        </div>

                        {/* Swap Button */}
                        <div className="col-span-12 md:col-span-1 flex justify-center">
                            <button
                                type="button"
                                onClick={handleSwapLocations}
                                className="p-3 h-12 w-12 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors"
                                aria-label="Swap locations"
                            >
                                <motion.div
                                    animate={{ rotate: isSwapped ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <FaExchangeAlt className="text-gray-700 dark:text-gray-300" />
                                </motion.div>
                            </button>
                        </div>

                        {/* To Location */}
                        <div className="col-span-12 md:col-span-3">
                            <label className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                To
                            </label>
                            <select
                                name="toDistrict"
                                defaultValue={searchData?.stand2 || ""}
                                className={`w-full p-3 rounded-lg border ${darkMode ?
                                    "bg-gray-700 border-gray-600 text-white" :
                                    "bg-gray-50 border-gray-300 text-gray-900"}`}
                                required
                            >
                                <option value="" disabled>Select destination</option>
                                {districts.map((stand, idx) => (
                                    <option key={idx} value={stand}>{stand}</option>
                                ))}
                            </select>
                        </div>

                        {/* Date */}
                        <div className="col-span-12 md:col-span-3">
                            <label className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                Date
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <FaCalendarAlt className={`${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                                </div>
                                <input
                                    name="date"
                                    type="date"
                                    defaultValue={searchData?.date || ""}
                                    min={new Date().toISOString().split("T")[0]}
                                    className={`w-full p-3 pl-10 rounded-lg border ${darkMode ?
                                        "bg-gray-700 border-gray-600 text-white" :
                                        "bg-gray-50 border-gray-300 text-gray-900"}`}
                                    required
                                />
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="col-span-12 md:col-span-2">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full ezy-button-primary flex items-center justify-center gap-2 p-3"
                            >
                                <FaSearch />
                                <span>Search</span>
                            </motion.button>
                        </div>
                    </form>
                </div>
            </section>
        </motion.div>
    );
};

export default HomeTravelCard;