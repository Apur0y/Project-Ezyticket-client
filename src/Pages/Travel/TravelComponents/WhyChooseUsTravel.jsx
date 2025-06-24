import { FaTools, FaSmile, FaBus, FaHandsHelping, FaStar, FaMoneyCheckAlt } from "react-icons/fa";
import BusImage from "../../../assets/Travel_image/luxury.jpg"
import useAuth from "../../../Hooks/useAuth";
const featuresLeft = [
    {
        title: "Expert Team",
        icon: <FaTools size={24} />,
        description: "Our experienced professionals are dedicated to delivering safe and comfortable journeys every time.",
    },
    {
        title: "Client Centered",
        icon: <FaSmile size={24} />,
        description: "We listen to your needs and tailor our services to ensure a seamless travel experience.",
    },
    {
        title: "Affordable Services",
        icon: <FaMoneyCheckAlt size={24} />,
        description: "Enjoy top-quality travel solutions at competitive prices without compromising comfort.",
    },
];

const featuresRight = [
    {
        title: "Reliable Support",
        icon: <FaHandsHelping size={24} />,
        description: "Our customer support team is available around the clock to assist you with any queries.",
    },
    {
        title: "Proven Excellence",
        icon: <FaBus size={24} />,
        description: "With a track record of punctuality and safety, we’re trusted by thousands of happy travelers.",
    },
    {
        title: "Complete Care",
        icon: <FaStar size={24} />,
        description: "From booking to arrival, we handle every detail so you can travel stress-free.",
    },
];

const WhyChooseUsTravel = () => {
    const {darkMode} = useAuth()
    return (
        <div className={`container mx-auto px-4 py-12 ${darkMode ?  "text-white" : "text-[#111111] " }`}>
            <div className="text-center mb-10">
                <p className="text-sm font-semibold  uppercase">Why Choose Us</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold ">
                    Your Trusted Partner in <span className="text-main italic">Excellence</span>
                </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-10 items-center">
                {/* Left Feature Boxes */}
                <div className="space-y-6">
                    {featuresLeft.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                            <div className="bg-main text-white rounded-lg p-4">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{feature.title}</h3>
                                <p className="text-sm ">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Center Image */}
                <div className="flex justify-center">
                    <img
                        src={BusImage} // replace with actual image path
                        alt="Luxury Bus Interior"
                        className="rounded-xl shadow-xl w-full max-w-md object-cover"
                    />
                </div>

                {/* Right Feature Boxes */}
                <div className="space-y-6">
                    {featuresRight.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                            <div className="bg-main text-white rounded-lg p-4">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{feature.title}</h3>
                                <p className="text-sm ">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WhyChooseUsTravel;
