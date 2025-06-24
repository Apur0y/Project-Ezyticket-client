import React, { useState } from 'react';
import travelBannerImage from "../../../assets/Travel_image/travel-service/bg-bus.jpg"
import useTravelData from '../../../Hooks/TrevalHook/useTravelData';
import Swal from 'sweetalert2'
const BusReservationPage = () => {
  const { busServices } = useTravelData()

  const [serviceType, setServiceType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ serviceType, name, email, phone, date, message });
    Swal.fire({
      title: "We will Contact with you vary soon",
      icon: "success",
      draggable: true
    });
  };

  return (
    <div className="min-h-screen my-20">
      {/* Banner Section */}
      <div
        className="relative hero min-h-[400px] flex items-center justify-center"
        style={{ backgroundImage: `url(${travelBannerImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 "></div>
        <div className="text-center text-white relative z-10">
          <div className={` text-center container mx-auto`}>
            <h1 className={`text-3xl font-bold md:text-4xl lg:text-6xl text-main`}>Book Your Bus Easily</h1>
            <p className='mt-5 md:w-10/12 mx-auto text-white'>Experience a fast, secure, and hassle-free way to reserve bus tickets. Choose your starting point, destination, and travel date effortlessly with our user-friendly booking system.</p>
          </div>
        </div>
      </div>

      {/* Reservation Form Section */}
      <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-2xl rounded-lg shadow-main">
        <h2 className="text-2xl font-bold text-center mb-6">Bus Reservation Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Service Type</label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              {
                busServices?.map((service, idx) => <button
                  key={idx}
                  type="button"
                  onClick={() => setServiceType(`${service.title}`)}
                  className={`p-4 border rounded-lg flex items-center justify-center ${serviceType === `${service?.title}` ? 'bg-main text-white' : 'bg-gray-100'}`}
                >
                  {service?.icon} {service?.title}
                </button>)
              }


            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Service</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Additional Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows="4"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-main text-white p-2 rounded-md hover:bg-main"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusReservationPage;
