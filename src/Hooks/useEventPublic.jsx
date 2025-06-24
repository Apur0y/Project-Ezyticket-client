import axios from "axios";
import React from "react";
const axiosInstance = axios.create({
  baseURL: [
    {
      _id: "ai-future-tech-summit",
      title: "AI & Future Tech Summit",
      description:
        "Join top industry experts and researchers for an in-depth discussion on the future of artificial intelligence, machine learning, and emerging technologies. This event will feature keynote speeches, panel discussions, and hands-on demonstrations of cutting-edge innovations.",
      organizedBy: "TechVision Bangladesh",
      dateTime: "2025-04-10T10:00:00",
      duration: "6 hours",
      location: "Radisson Blu, Dhaka",
      photo:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: 1500,
      remainingTickets: 4,
    },
    {
      _id: "startup-pitch-night",
      title: "StartUp Pitch Night",
      description:
        "Aspiring entrepreneurs will have the opportunity to present their business ideas to a panel of investors and industry leaders. Gain valuable feedback, networking opportunities, and a chance to secure funding for your startup. The event includes interactive Q&A sessions and expert mentorship.",
      organizedBy: "Bangladesh Startup Hub",
      dateTime: "2025-04-15T18:30:00",
      duration: "3 hours",
      location: "Online",
      photo:
        "https://images.pexels.com/photos/933964/pexels-photo-933964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: 0,
      remainingTickets: 6,
    },
    {
      _id: "gaming-fiesta-2025",
      title: "Gaming Fiesta 2025",
      description:
        "A paradise for gamers! Join thrilling gaming tournaments, participate in workshops by professional gamers, and get an exclusive first look at upcoming games. Whether you're a casual player or a hardcore esports fan, this event is packed with excitement and entertainment.",
      organizedBy: "Gamers Unite Bangladesh",
      dateTime: "2025-05-05T12:00:00",
      duration: "8 hours",
      location: "BICC, Dhaka",
      photo:
        "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: 500,
      remainingTickets: 2,
    },
    {
      _id: "photography-masterclass",
      title: "Photography Masterclass",
      description:
        "Enhance your photography skills with this exclusive masterclass led by renowned photographers. Learn advanced techniques, composition strategies, and post-processing secrets. Perfect for hobbyists and professionals looking to take their craft to the next level.",
      organizedBy: "Shutterbugs Bangladesh",
      dateTime: "2025-03-30T15:00:00",
      duration: "4 hours",
      location: "Online",
      photo:
        "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: 800,
      remainingTickets: 5,
    },
    {
      _id: "green-future-expo",
      title: "Green Future Expo",
      description:
        "Discover the latest in sustainability and eco-friendly innovations at the Green Future Expo. This exhibition will feature green energy solutions, sustainable products, and panel discussions on environmental conservation. Join us in shaping a greener future.",
      organizedBy: "EcoVision BD",
      dateTime: "2025-06-12T10:00:00",
      duration: "7 hours",
      location: "Bashundhara Convention Center, Dhaka",
      photo:
        "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: 200,
      remainingTickets: 0,
    },
    {
      _id: "blockchain-crypto-conference",
      title: "Blockchain & Crypto Conference",
      description:
        "Explore the impact of blockchain technology and cryptocurrency in today's financial ecosystem. This conference brings together blockchain experts, fintech leaders, and investors to discuss innovations, regulations, and the future of decentralized finance.",
      organizedBy: "Crypto Enthusiasts Bangladesh",
      dateTime: "2025-07-20T14:00:00",
      duration: "5 hours",
      location: "Online",
      photo:
        "https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: 1000,
      remainingTickets: 3,
    },
    {
      _id: "music-fest-dhaka",
      title: "Music Fest Dhaka",
      description:
        "Experience an electrifying night of music with performances by top local and international artists. From rock to EDM, this festival promises an unforgettable live music experience, featuring dazzling stage production and an incredible atmosphere.",
      organizedBy: "Dhaka Music Crew",
      dateTime: "2025-08-05T19:00:00",
      duration: "5 hours",
      location: "Army Stadium, Dhaka",
      photo:
        "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: 3000,
      remainingTickets: 0,
    },
  ],
  withCredentials: true,
});
const useEventPublic = () => {
  return axiosInstance;
};

export default useEventPublic;
