import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import useAuth from "../../Hooks/useAuth";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone:"",
    subject:"",
    message: "",
  });

  const { darkMode } = useAuth();
  
  const option = [
    {
      way: "Our Email",
      icon: <FaEnvelope className="text-white text-3xl" />,
      description: "For any inquiries or support ",
      info1: "Business: ezy@gmail.com",
      info2: "Support: ticket@gmail.com",
    },
    {
      way: "Our Phone",
      icon: <FaPhone className="text-4xl mx-auto text-white mb-3" />,
      description: "Call us for immediate assistance.",
      info1: "Main Office: +123 456 7890",
      info2: "24/7 Service: +987 654 3210",
    },
    {
      way: "Location",
      icon: <FaMapMarkerAlt className="text-4xl mx-auto text-white mb-3" />,
      description: "Visit us at our office.",
      info1: "Wireless, Dhaka, Bangladesh",
      info2: "ZIP Code: 12345",
    },
  ];



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  
    const data = {
      ...formData,
      to_email: 'game0play24@gmail.com', // Email goes to user + you
    };
  
    emailjs.send(
      'service_a5b9hp8',
      'template_0bala3l',
      data,
      '_zYfso5aD1icXWoC-'
    ).then(
      (result) => {
        console.log('Email sent successfully:', result.text);
      },
      (error) => {
        console.error('Error sending email:', error);
      }
    );
  };
  
  return (
    <div className={`  ${darkMode ? "text-white" : ""} `}>
      <div className={`relative  ${darkMode ? "text-white" : ""} pb-44 md:pb-1`}>
        {/* Page Heading */}
        <div className="relative ">
          <img src="/contact1.jpg" alt="" className=" w-full object-cover h-[200px] md:h-full" />
          <div className="bg-gradient-to-l from-black/70 to-transparent inset-0 absolute"></div>
        </div>

        <div className=" absolute top-20 md:top-45 ml-7 md:ml-20 text-white text-md md:text-xl mb-16">
          <h1 className="text-2xl md:text-5xl font-bold mb-1 md:mb-4">Contact Us</h1>
          <p className="flex text-gray-200">
            Home <IoIosArrowForward className="my-auto" /> Contact
          </p>
          {/* <p className="text-lg max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question, feedback, or just want to say hello — we’re here to help.
        </p> */}
        </div>

        <div className="">
          <div className="md:bg-white/50 backdrop-blur-2xl  md:text-black absolute scale-50 sm:scale-75 md:scale-80 lg:scale-100 top-20 md:top-50 lg:top-96 left-1/2 transform -translate-x-1/2 mx-auto md:shadow-2xl w-10/12 h-80  mt-20">
            {/* connections way */}
            <div className=" bg-main flex items-center justify-center  relative ">
              <div className="absolute z-20 -top-9 flex flex-col sm:flex-row gap-5 lg:gap-20">
                {option.map((option) => (
                  <div className="flex flex-col justify-center items-center gap-2 lg:gap-5">
                    <p className="w-20 h-20 bg-main rounded-full flex items-center justify-center mx-auto mb-3">
                      {option.icon}
                    </p>

                    <h1 className="text-2xl font-bold md:text-gray-900">
                      {option.way}
                    </h1>
                    {/* <p>{option.description}</p> */}
                    <div className="text-center">
                      <p className="text-gray-1200 mt-2">{option.info1}</p>
                      <p>{option.info2}</p>
                    </div>

                    <button className="py-2 px-4 border-2 rounded-3xl mt-10 font-bold">
                      {option.way}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Section */}

        {/* <div className="bg-white p-6 rounded-xl shadow-md">
          <FaClock className="text-4xl mx-auto text-green-700 mb-3" />
          <h3 className="text-xl font-semibold text-green-800">Business Hours</h3>
          <p className="text-sm mt-2">Mon - Fri: 9:00 AM - 6:00 PM</p>
          <p className="text-sm">Saturday: 10:00 AM - 4:00 PM</p>
          <p className="text-sm">Sunday: Closed</p>
        </div>
      </div>  */}

        {/* Message Us Section */}
      </div>
     
      <div className="md:mt-60 mt-96  max-w-6xl mx-auto  items-center   backdrop-blur-lg p-10 rounded-xl ">
        <div className="mb-10">
        <p className="flex items-center gap-4 ml-3 text-md font-bold mb-3">
        <span className="w-16 h-px bg-black font-bold"></span>CONTACT <span className="w-16 h-px bg-black font-bold"></span>
</p>

        <h1 className="text-2xl md:text-4xl font-bold">KEEP IN TOUCH</h1>
        </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
 
        
        <form
          onSubmit={handleSubmit}
          className=" rounded-lg "
        >
       

          <div className="flex gap-3">
          <div className="mb-6 w-full">
            {/* <label className="block text-green-900 font-medium text-lg">
              Name
            </label> */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 mt-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-6 w-full">
         
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border  border-gray-300  mt-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
              required
            />
          </div>
          </div>


          <div className="flex gap-3">
          <                                                                                                                                                                                                                                                                                                                                                                                                                                                   div className="mb-6 w-full">
         
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 mt-2  focus:ring-2 focus:ring-green-600 focus:outline-none"
              placeholder="Phone"
              required
            />
          </div>
          <div className="mb-6 w-full">
         
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 border  border-gray-300  mt-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
              required
            />
          </div>
          </div>


          <div className="mb-6">
            <label className="block text-green-900 font-medium text-lg">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className=" bg-main text-white text-xs py-2 px-5 font-semibold hover:bg-green-800 transition"
          >
            SUBMIT
          </button>
        </form>



        <div>
          <img src="/map.png" alt="" className="object-cover" />
          
        </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
