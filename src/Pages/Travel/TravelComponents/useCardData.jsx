import { AiFillDollarCircle } from "react-icons/ai";
import { FaBus, FaSearch } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";

const useCardData = () => {
    const travelCards = [
        {
          title: "Search Your Route",
          description: "Choose your origin, destination, journey dates and search for buses",
          icon: <FaSearch />,
        },
        {
          title: "Select Your Bus",
          description: "Choose the best bus option for your journey.",
          icon: <FaBus />,
        },
        {
          title: "Booking & Confirm",
          description: "Confirm your booking details and proceed.",
          icon:<IoMdDoneAll />,
        },
        {
          title: "Booking Payment",
          description: "Securely pay for your ticket online.",
          icon: <AiFillDollarCircle />,
        },
        ]
      

    return [travelCards]
}

export default useCardData;