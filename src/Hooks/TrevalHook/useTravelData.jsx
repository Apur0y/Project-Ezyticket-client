// reservation data image
import BusImage1 from "../../assets/Travel_image/travel-service/image1.jpg"
import BusImage3 from "../../assets/Travel_image/travel-service/image3.jpg"
import BusImage4 from "../../assets/Travel_image/travel-service/image4.jpg"
import BusImage5 from "../../assets/Travel_image/travel-service/image5.jpg"
import BusImage6 from "../../assets/Travel_image/travel-service/image6.jpg"
import BusImage2 from "../../assets/Travel_image/travel-service/image2.jpg"
// icon
import { FaBus, FaPlane, FaCalendarAlt, FaSchool, FaMapMarkedAlt } from 'react-icons/fa';
import { MdOutlineCorporateFare } from "react-icons/md";


const useTravelData = () => {

    // reservation data start
    const busServices = [
        {
            title: "Corporate Shuttle Service",
            image: BusImage1,
            icon:<MdOutlineCorporateFare className="mr-2"/>
        },
        {
            title: "Airport Transfer Service",
            image: BusImage2,
            icon:<FaPlane className="mr-2" />
        },
        {
            title: "City & Intercity Bus Service",
            image: BusImage3,
            icon:<FaMapMarkedAlt className="mr-2" />
        },
        {
            title: "Event Transportation",
            image: BusImage4,
            icon: <FaCalendarAlt className="mr-2" />
        },
        {
            title: "School & College Bus Service",
            image: BusImage5,
            icon:<FaSchool className="mr-2" />
        },
        {
            title: "Tour & Travel Bus Rentals",
            image: BusImage6,
            icon: <FaMapMarkedAlt className="mr-2" />
        },
    ];
    // reservation data end
    // travel Faqs
    const travelFaqs = [
        {
          question: "How can I book a ticket online?",
          answer: "You can book a ticket by selecting your preferred bus, entering your details, and making a payment through our secure platform."
        },
        {
          question: "What payment methods are accepted?",
          answer: "We accept credit/debit cards, mobile payments, and online banking for a smooth transaction experience."
        },
        {
          question: "Can I cancel or modify my booking?",
          answer: "Yes, you can cancel or modify your booking from your account dashboard. Cancellation policies may vary depending on the bus operator."
        },
        {
          question: "Will I receive a confirmation after booking?",
          answer: "Yes, after a successful booking, you will receive an email and SMS confirmation with your ticket details."
        },
        {
          question: "Do I need to print my ticket?",
          answer: "No, you can show your e-ticket on your phone at the boarding point. However, some operators may require a printed ticket."
        },
        
      ];
    //   travel Faqs
      
    
    return {busServices, travelFaqs}
}

export default useTravelData