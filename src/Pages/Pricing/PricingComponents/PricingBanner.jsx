import { FaArrowRight, FaTicketAlt } from "react-icons/fa";
import ticket from "../../../assets/Pricing_image/ticket.png";

const PricingBanner = () => {
    return (
        <div className=" bg-gradient-to-br from-green-300 via-green-50 to-green-200 ">
            <div className=" grid grid-cols-1 md:grid-cols-2 w-11/12 mx-auto gap-10 py-16 items-center">
                {/* Text Content */}
                <div className="space-y-6 md:space-y-8 text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                        EzyTicket Pricing
                    </h2>
                    <p className="text-lg md:text-lg text-gray-500">
                        We believe your event experience should be simple, elegant, and hassle-free. Our aim is to create that experience so that you can focus on hosting your event while we take care of the rest.
                    </p>
                    <button className="ezy-button-primary">
                        Create Event
                        <FaArrowRight className="ml-2" />
                    </button>
                </div>

                <div className="">
                    {/* Image */}
                    <div className="md:w-10/12 mx-auto flex items-center justify-center bg-green-200 py-8 rounded-2xl overflow-hidden shadow">
                        <img
                            src={ticket}
                            alt="ticket"
                            className="w-64 md:w-72 h-auto transform hover:scale-105 transition-transform"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingBanner;