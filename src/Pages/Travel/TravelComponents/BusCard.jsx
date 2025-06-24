
import { Link } from "react-router-dom";
import useTravelContext from "../../../Hooks/TrevalHook/useTravelContext";
import useAuth from "../../../Hooks/useAuth";
import { PiBusBold } from "react-icons/pi";
import { FaLocationDot, FaClock, FaChair, FaBangladeshiTakaSign } from "react-icons/fa6";



const BusCard = ({ bus, time }) => {

    const { searchData } = useTravelContext()
    const { darkMode } = useAuth()
    const currentDate = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })

    return (
        <div 
        className={`w-full mx-auto 
            ${darkMode ? "bg-[#1d1d1d] text-white":
                "bg-white"}  rounded-2xl shadow-lg overflow-hidden m-4 `}
        >
            {/* Header Section */}
            <div 
            className="bg-main text-white p-6 flex justify-between items-center">
                <div>
                    <h1 
                    className="text-2xl font-bold flex items-center gap-2">
                        <PiBusBold className="text-supporting" />
                        {bus?.busName || "Unknown Bus"}
                    </h1>
                    <p 
                    className="text-sm text-emerald-200"
                    >Express Service • {bus?.type || "Non-AC Bus"}
                    </p>
                </div>
                <div className="text-right"
                >
                    <p className="text-xs opacity-75">
                        Booking Ref:
                        </p>
                    <p className="font-mono text-emerald-100">
                        <span className="uppercase">
                            {bus?.busName.slice(0,3)}</span>
                            -{bus?._id}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6 space-y-6">
                {/* Route Details */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        {/* From */}
                        <div className="flex items-start gap-3">
                            <FaLocationDot className="text-emerald-600 mt-1 shrink-0" />
                            <div>
                                <h3 
                                className="font-bold ">
                                    {bus?.from || "Unknown Starting Point"}
                                    </h3>
                                <p className="text-sm text-dark-primary">
                                    Platform 1
                                    </p>
                            </div>
                        </div>

                        {/* Duration */}
                        <div className="flex items-center gap-3 ml-1">
                            <FaClock className="text-emerald-600 shrink-0" />
                            <div>
                                <p className="font-medium ">4 Hours Journey</p>
                                <div className="w-32 h-1 bg-emerald-100 rounded-full mt-1">
                                    <div className="w-3/4 h-full bg-emerald-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* To */}
                        <div className="flex items-start gap-3">
                            <FaLocationDot className="text-emerald-600 mt-1 shrink-0" />
                            <div>
                                <h3 className="font-bold ">
                                    {bus?.to || "Unknown Destination"}
                                    </h3>
                                <p className="text-sm text-dark-primary ">
                                    Platform 2
                                    </p>
                            </div>
                        </div>
                    </div>

                    {/* Trip Info */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className={` ${darkMode ? "bg-dark-surface text-dark-primary" : "bg-emerald-50 "} p-4 rounded-xl`}>
                                <p className="text-sm text-emerald-600">
                                    Departure Time
                                    </p>
                                <p className="font-bold text-2xl ">
                                    {bus?.busTimes || "N/A"}
                                    </p>
                            </div>
                            <div className={` 
                                ${darkMode ? "bg-dark-surface text-dark-primary" 
                                : 
                                "bg-emerald-50"}  
                                p-4 rounded-xl`}>
                                <p className="text-sm text-emerald-600">
                                    Date
                                    </p>
                                <p className="font-bold ">
                                    {searchData?.date || currentDate}
                                    </p>
                            </div>
                        </div>

                        <div 
                        className={` 
                        ${darkMode ? "bg-dark-surface text-dark-primary" : 
                        "bg-emerald-50 "}  p-4 rounded-xl `
                        }>
                            <p className="text-sm text-emerald-600">
                                Total Price
                                </p>
                            <p 
                            className="font-bold text-3xl text-emerald-700 flex items-center gap-1"
                            >
                                {bus?.ticketPrice || 0} 
                                <FaBangladeshiTakaSign className="text-base" />
                            </p>
                        </div>
                    </div>
                </div>

                {/* Seat Availability & Action */}
                <div 
                className={`flex flex-col sm:flex-row justify-between items-center 
                    ${darkMode ? "bg-dark-surface text-dark-primary" :
                     "bg-emerald-50 "} p-4 rounded-xl gap-4`}
                     >
                    <div className="flex items-center gap-3">
                        <FaChair className="text-emerald-600 text-xl" />
                        <div>
                            <p className="font-semibold text-emerald-700">
                                {52 - bus?.bookedSeats?.length || 52} Seats Available
                            </p>
                            <p className="text-sm text-emerald-600">Economy Class</p>
                        </div>
                    </div>
                    <Link
                        to={`/travel/bus-set/${bus?._id}`}
                        state={bus}
                        className="w-full sm:w-auto bg-main hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200 text-center"
                    >
                        Book Now
                    </Link>
                </div>

                {/* Policy Section */}
                <div className="text-center space-y-2">
                    <p className="text-emerald-600 font-medium">
                        <span className={` 
                            ${darkMode ? "bg-dark-surface text-dark-primary" :
                             "bg-emerald-50 "} px-2 py-1 rounded-md`}
                             >ⓘ Non-Refundable Ticket</span>
                    </p>
                    <p className="text-sm text-gray-600">
                        Cancellation policy: 50% refund up to 6 hours before departure
                    </p>
                </div>

                {/* Footer */}
                {/* <div 
                className="border-t border-emerald-100 pt-4">
                    <div 
                    className="font-mono text-center text-2xl tracking-widest text-gray-800">
                        ▰▰▰▰▰ 1234 5678 9012 ▰▰▰▰▰
                    </div>
                    <p 
                    className="text-center text-xs text-gray-500 mt-2">
                        Show this barcode at boarding time
                    </p>
                </div> */}
            </div>
        </div>
    )
}

export default BusCard