import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const TravelServiceCard = ({ service }) => {
    return (
        <div className="relative">
            <img src={service?.image} className="w-full" alt="" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>

            {/* Title Centered */}
            <div className="absolute inset-0 flex flex-col items-center  justify-end text-center">
                <h3 className="text-white text-2xl font-black mb-14">{service?.title}</h3>
              <Link to='/travel/bus-reservation' className="text-xl text-white hover:bg-[#6da754] duration-300 -mb-5  bg-main h-10 w-10 rounded-full flex justify-center items-center"><FaArrowRight /></Link>
            </div>
        </div>
    )
}

export default TravelServiceCard