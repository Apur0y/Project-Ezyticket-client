import PricingBanner from "./PricingComponents/PricingBanner";
import bangladesh from "../../assets/Pricing_image/bangladesh-icon.png"
import PricingCalculator from "./PricingComponents/PricingCalculator";
import Marquee from "react-fast-marquee";
import logo1 from "../../assets/Pricing_image/logo1.png"
import logo2 from "../../assets/Pricing_image/logo2.jpeg"
import logo3 from "../../assets/Pricing_image/logo3.png"
import logo4 from "../../assets/Pricing_image/logo4.jpeg"
import logo5 from "../../assets/Pricing_image/logo5.jpeg"
import logo6 from "../../assets/Pricing_image/logo6.jpeg"
import logo7 from "../../assets/Pricing_image/logo7.png"
import logo8 from "../../assets/Pricing_image/logo8.png"
import logo9 from "../../assets/Pricing_image/logo9.png"
import logo10 from "../../assets/Pricing_image/logo10.jpeg"
import logo11 from "../../assets/Pricing_image/logo11.jpeg"
import logo12 from "../../assets/Pricing_image/logo12.png"
import PricingFaq from "./PricingComponents/PricingFaq";
const Pricing = () => {
    return (
        <div className="pt-16">
            <PricingBanner></PricingBanner>
            <div className="my-8 md:py-12 w-11/12 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 text-gray-800">
                        <h2 className="text-3xl md:text-4xl font-bold text-main mb-2">EzyTicket is Completely Free to Use</h2>

                        <h2 className="text-xl md:text-2xl font-bold mb-4 dark:text-white"> We only charge when you sell tickets for your Event</h2>

                        <p className="text-lg text-gray-500">With EzyTicket, you can create, manage, and promote your events without any upfront costs. Our platform is designed to support your success, and we only take a small fee when you sell tickets. All ticket prices are displayed in Bangladeshi Taka (BDT), making it easy for you and your attendees to plan and budget effectively.</p>


                        <div className="flex items-center text-lg text-gray-500">Displaying ticket price for
                            <span className="mx-2">
                                <img src={bangladesh} alt="Bangladesh flag" className="w-8 h-auto" />
                            </span>
                            Bangladesh
                        </div>
                    </div>
                    <div className="md:col-span-1">
                        <div className="bg-green-200 text-supporting border border-gray-300 text-center p-16 space-y-4 rounded-2xl">
                            <h3 className="text-8xl font-bold">5%</h3>
                            <p className="text-2xl font-semibold">Per ticket sold</p>
                        </div>
                    </div>

                </div>
            </div>
            <PricingCalculator></PricingCalculator>
            <div className="bg-gradient-to-br from-green-300 via-green-50 to-green-300">
                <div className="w-11/12 mx-auto py-20">
                    <p className="text-3xl md:text-4xl text-gray-800 font-bold text-center">321+ events created by hundreds of organizations around Bangladesh
                    </p>
                    <div className="mt-12">
                        <Marquee>
                            <div>
                                <img src={logo1} alt="Event Logo"  className="w-40 h-32 mr-4 rounded-md"/>
                            </div>
                            <div>
                                <img src={logo2} alt="Event Logo"  className="w-40 h-32 mr-4 rounded-md"/>
                            </div>
                            <div>
                                <img src={logo3} alt="Event Logo"  className="w-40 h-32 mr-4 rounded-md"/>
                            </div>
                            <div>
                                <img src={logo4} alt="Event Logo"  className="w-40 h-32 mr-4 rounded-md"/>
                            </div>
                            <div>
                                <img src={logo5} alt="Event Logo"  className="w-40 h-32 mr-4 rounded-md"/>
                            </div>
                            <div>
                                <img src={logo6} alt="Event Logo"  className="w-40 h-32 mr-4 rounded-md"/>
                            </div>
                            <div>
                                <img src={logo7} alt="Event Logo"  className="w-40 h-32 mr-4 rounded-md"/>
                            </div>
                            <div>
                                <img src={logo8} alt="Event Logo"  className="w-40 h-32 mr-4 rounded-md"/>
                            </div>
                            <div>
                                <img src={logo9} alt="Event Logo"  className="w-40 h-32 mr-4 rounded-md"/>
                            </div>
                            <div>
                                <img src={logo10} alt="Event Logo"  className="w-40 h-32 mr-4 rounded-md"/>
                            </div>
                            <div>
                                <img src={logo11} alt="Event Logo"  className="w-40 h-32 mr-4 rounded-md"/>
                            </div>
                            <div>
                                <img src={logo12} alt="Event Logo"  className="w-40 h-32 mr-4 rounded-md"/>
                            </div>
                        </Marquee>
                    </div>
                </div>
            </div>
            <PricingFaq></PricingFaq>
        </div>
    );
};

export default Pricing;