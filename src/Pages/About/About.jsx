import { IoIosArrowForward, IoIosTimer } from "react-icons/io";
import useAuth from "../../Hooks/useAuth";
import AboutCounter from "./AboutCounter";
import { MdMoreTime } from "react-icons/md";
import { CiCreditCard1, CiMedicalClipboard } from "react-icons/ci";
import { FaFacebookF, FaLinkedinIn, FaRegHandshake } from "react-icons/fa";
import { TbColorFilter, TbPhoneCall } from "react-icons/tb";
import { IoCallOutline, IoColorFilterOutline } from "react-icons/io5";
import { PiHandshakeLight } from "react-icons/pi";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";

const About = () => {
  const { darkMode } = useAuth();

  const services=[
    {
      title: "Real-Time Availability",
      desc: "Live schedules",
    icon:<IoIosTimer />
    },
    {
      title: "Secure Payment",
      desc: "100% Safe",
      icon:<CiCreditCard1 />
    },
    {
      title: "Dashboard Manager",
      desc: "Helps Monitoring",
      icon:<CiMedicalClipboard />
    },
    {
      title: "Easy  Booking",
      desc: "Simple Process",
      icon:<IoColorFilterOutline />
    },
    {
      title: "Reliable Partners",
      desc: "Verified and top-rated.",
      icon:<PiHandshakeLight />
    },
    {
      title: "24/7 Support",
      desc: "When needed",
      icon:<IoCallOutline />
    },
  ]

  
  const leaders =[
    { name: "Mazharul Islam  Sourav", role: "Team Lead",description:"Mazharul is a seasoned manager with over 10 years of experience in the transportation industry. He is known for his strategic thinking and leadership skills.",social:"https://www.linkedin.com/in/rohim-khan" },
    { name: "Apu Roy", image:"/apuroy.jpg", role: "Team Member",description:"Apu is the visionary director behind our platform, with a passion for innovation and a commitment to excellence in customer service.",social:"https://www.linkedin.com/in/md-abdullah" },
    { name: "Mahdi Asif",image:"/asif.jpg", role: "Team Member",description:"Mahdi  is a dedicated employee who ensures smooth operations and exceptional customer experiences. His attention to detail and problem-solving skills are invaluable.",social:"https://www.linkedin.com/in/mehedi-hossain" },
    { name: "Kobirul islam",image:"", role: "Team Member",description:"Mahdi  is a dedicated employee who ensures smooth operations and exceptional customer experiences. His attention to detail and problem-solving skills are invaluable.",social:"https://www.linkedin.com/in/mehedi-hossain" },
    { name: "Tanmoy",image:"", role: "Team Member",description:"Mahdi  is a dedicated employee who ensures smooth operations and exceptional customer experiences. His attention to detail and problem-solving skills are invaluable.",social:"https://www.linkedin.com/in/mehedi-hossain" },
    { name: "Susanto",image:"", role: "Team Member",description:"Mahdi  is a dedicated employee who ensures smooth operations and exceptional customer experiences. His attention to detail and problem-solving skills are invaluable.",social:"https://www.linkedin.com/in/mehedi-hossain" },
  ]

  return (
    <div className={` text-black   ${darkMode ? "text-white" : ""}`}>
      <div
        className={` relative text-center ${darkMode ? "text-gray-600" : ""}`}
      >
        <div className="relative ">
          <img
            src="/contact2.jpg"
            alt=""
            className=" w-full object-cover h-[200px] md:h-[400px]"
          />
          <div className="bg-gradient-to-l from-black/50 to-gray-700/90 inset-0 absolute"></div>
        </div>

        <div className=" absolute top-20 md:top-45 ml-7 md:ml-20 text-white text-md md:text-xl mb-16">
          <h1 className="text-2xl md:text-5xl font-bold mb-1 md:mb-4">About Us</h1>
          <p className="flex text-gray-200">
            Home <IoIosArrowForward className="my-auto" /> About
          </p>
          {/* <p className="text-lg max-w-2xl mx-auto">
                  We'd love to hear from you! Whether you have a question, feedback, or just want to say hello — we’re here to help.
                </p> */}
        </div>



        {/* Header Section */}
        {/* <div className="relative flex h-[500px] overflow-hidden mt-32">
        
          <div className="w-full">
            <img
              src="/about1.jpg"
              alt="Side"
              className="h-full w-full object-cover"
            />
          </div>

       
          <div className="absolute top-0 right-0 h-full w-1/2 bg-white z-10 clip-diagonal-reverse pl-44 shadow-lg overflow-y-auto">
            <h2 className="text-3xl font-bold mb-4">What We Are</h2>
            <p className="text-gray-700">
            We aim to simplify transportation and event experiences across the nation. Our platform empowers users to find, book, and manage travel and event plans with ease and efficiency — ensuring comfort, transparency, and trust at every step.
            </p>
            
          </div>
        </div> */}

      </div>






      {/* Our Mission Section */}
      <div className="mt-20 w-10/12 md:w-full md:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
   
        <img
          src="/about2.jpg"
          alt="Our Mission"
          className="rounded-xl shadow-lg"
        />
        
        <div className="flex flex-col gap-2">
          <p className="text-main text-xs md:text-base font-bold">WHAT WE DO</p>
          <h2 className="text-xl md:text-5xl font-semibold md:mb-4 ">
            We make your booking easier, seamless and enjoyable!
          </h2>
          <AboutCounter></AboutCounter>
          <p
            className={`text-sm md:text-lg leading-relaxed ${
              darkMode ? "text-gray-600" : ""
            }`}
          >
            We aim to simplify transportation and event experiences across the
            nation. Our platform empowers users to find, book, and manage travel
            and event plans with ease and efficiency — ensuring comfort,
            transparency, and trust at every step.
          </p>
        </div>
         </div>

      {/* Features Section */}
      <div className="mt-20 w-10/12 max-w-6xl mx-auto">
        <h2 className="text-xl md:text-3xl font-semibold text-center  mb-12">
          {" "}
          Why Choose Us
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((feature, idx) => (
            <div
              key={idx}
              className={`p-2 md:p-12 flex flex-col justify-center items-center backdrop-blur-2xl shadow-2xl shadow-gray-500 ${
                darkMode ? "" : ""
              }`}
            >
              <p className="text-4xl ">{feature.icon}</p>
              <h3 className="text-sm md:text-xl text-main font-bold mt-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-xs md:text-base">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="my-24 w-11/12 mx-auto text-center ">
        <h2 className="text-3xl font-semibold  mb-10">
          {" "}
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
          {leaders.map((member) => (
            <div
              key={member}
              className={` rounded-lg p-6 border ${darkMode ? "" : "bg-white"}`}
            >
              <div
                className={`w-36 h-36 mx-auto mb-4 rounded-full bg-green-200 `}
              >
                <img src={member.image} alt="" className="w-36 h-36 mx-auto mb-4 rounded-full object-cover" />
                </div>
              <div className="mb-5">
              <h3 className="text-lg text-main font-bold ">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            

              <p className="px-2 text-center">{member.description}</p>

              <div className="flex gap-5 justify-center items-center mt-7">

                <Link to='https://www.linkedin.com/in/apu-r0y/'>
                <FaLinkedinIn />
                </Link>
                <Link to='https://www.linkedin.com/in/apu-r0y/'>
                <BsTwitterX />
                </Link>

                <Link to='https://www.linkedin.com/in/apu-r0y/'>
                <FaFacebookF />
                </Link>
             
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call To Action */}
      {/* <div className="flex justify-center mt-24">
        <button className="px-10 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
          Explore the Platform
        </button>
      </div> */}
    </div>
  );
};

export default About;
