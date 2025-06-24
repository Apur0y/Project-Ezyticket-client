import { Link } from "react-router-dom"
import useTravelData from "../../../Hooks/TrevalHook/useTravelData"
import useAuth from "../../../Hooks/useAuth"

const TravelFAQ = () => {
    const {travelFaqs} = useTravelData()
    const {darkMode} = useAuth()
    return (
        <div className="hero container mx-auto px-5">
            <div className=" grid md:grid-cols-2 gap-10">
                <div className="w-full">
                    {/* text */}
                    <p className="text-supporting font-bold text-xl mb-4">FAQ</p>
                    <h1 className={`text-2xl md:text-3xl lg:text-5xl font-bold ${darkMode ?  " text-white" : "text-[#111111]" }`}>General Question For Travel</h1>
                    <p className={`${darkMode ?  " text-white" : "text-[#111111]" } py-6`}>Find answers to common questions about booking, payments, cancellations, and more to make your travel experience smooth and hassle-free.</p>
                    <div>
                        {/* FAQ */}
                        {
                            travelFaqs?.map((faq,idx)=><div 
                            key={idx}
                            className={`collapse mb-5 collapse-plus shadow ${darkMode ?  "bg-[#1d1d1d] text-white" : "bg-white text-[#111111]" }`}>
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title font-semibold">{faq?.question}</div>
                            <div className="collapse-content text-sm">{faq?.answer}</div>
                        </div>)
                        }
                       
                    </div>
                    <Link to="/about">
                    <button className="ezy-button-primary">More About Us</button>
                    </Link>
                </div>
                <img
                    src="https://images.pexels.com/photos/7251529/pexels-photo-7251529.jpeg"
                    className="w-full h-[600px] object-cover rounded-lg shadow-2xl font-black" />
            </div>
        </div>
    )
}

export default TravelFAQ