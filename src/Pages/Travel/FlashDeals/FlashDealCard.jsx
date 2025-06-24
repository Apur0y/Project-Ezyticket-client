import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { IoWalletOutline } from "react-icons/io5";

const FlashDealCard = ({ deal }) => {
    const { title, image, discount, promoCode } = deal;
    const { darkMode } = useAuth();

    return (
        <div className={`relative w-full max-w-sm mx-auto rounded-3xl overflow-hidden hover:shadow-none transition-all  ${darkMode ? "bg-[#1d1d1d] text-white" : "bg-white text-gray-900"}`}>
            {/* Image */}
            <div className="relative">
                <img src={image} alt={title} className="w-full h-48 object-cover" />
                <div className="absolute top-3 right-3 bg-gradient-to-br from-supporting to-supporting text-black text-[13px] font-semibold px-4 py-1 rounded-full shadow-sm">
                     {discount} OFF
                </div>
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-4">
                <div>
                    <h2 className="text-xl font-bold leading-tight">{title}</h2>
                    <p className="text-sm text-dark-secondary dark:text-gray-300 mt-1">Celebrate Eid with savings! Enjoy exclusive deals using the code below.</p>
                </div>

                {/* Code Box + CTA */}
                <div className={`flex items-center justify-between bg-gradient-to-r  ${ darkMode ?  "from-dark-surface to-dark-surface" : "from-gray-100 to-gray-200"} p-4 rounded-xl shadow-inner`}>
                    <div className="flex items-center gap-2 font-semibold text-sm">
                        <IoWalletOutline className="text-2xl text-green-500" />
                        <span className="opacity-80">Code:</span>
                        <span className="text-main font-extrabold tracking-wider">{promoCode}</span>
                    </div>
                    <Link
                        to="/travel/bus-ticket-book"
                        className="bg-main text-white px-4 py-1.5 rounded-md hover:scale-105 transition-all duration-300 shadow-md"
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FlashDealCard;
